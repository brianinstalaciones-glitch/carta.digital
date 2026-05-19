# =============================================================
#  nuevo-cliente.ps1  -  Carta Digital - Alta de nuevo cliente
# =============================================================
#
#  Uso:
#    .\nuevo-cliente.ps1 -id "nrc" -nombre "El Nuevo Restaurante"
#
#  Parametros:
#    -id       Slug corto (solo letras minusculas/numeros, sin espacios)
#              Ej: nrc, sushi1, burger2 -- sera el RESTAURANT_ID en Firebase
#    -nombre   Nombre completo del restaurante (para titulos y textos)
#    -slug     (Opcional) Nombre de carpeta si difiere de -id
#
# =============================================================

param(
    [Parameter(Mandatory=$true)]
    [string]$id,

    [Parameter(Mandatory=$true)]
    [string]$nombre,

    [string]$slug = ""
)

# -- Validaciones ---------------------------------------------
if ($id -notmatch '^[a-z0-9]+$') {
    Write-Error "El id solo puede contener letras minusculas y numeros (sin espacios ni guiones). Ej: nrc, sushi1"
    exit 1
}

if ($slug -eq "") { $slug = $id }

$base   = "$PSScriptRoot\clientes"
$src    = "$base\afuegolento"
$dst    = "$base\$slug"

if (-not (Test-Path $src)) {
    Write-Error "No se encontro la carpeta fuente: $src"
    exit 1
}

if (Test-Path $dst) {
    Write-Error "Ya existe la carpeta destino: $dst  -- elegi otro slug o borrala primero."
    exit 1
}

Write-Host ""
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Carta Digital - Alta de nuevo cliente" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  ID/RID    : $id"
Write-Host "  Nombre    : $nombre"
Write-Host "  Carpeta   : clientes\$slug"
Write-Host "--------------------------------------------------------" -ForegroundColor DarkGray
Write-Host ""

# -- 1. Copiar carpeta base (AFL) ------------------------------
Copy-Item $src $dst -Recurse
Write-Host "[1/3] Carpeta copiada." -ForegroundColor Green

# -- 2. Reemplazos en archivos HTML ---------------------------
$nombreUp = $nombre.ToUpper()

# Lista de reemplazos (especificos primero para evitar doble-replace)
$replacements = @(
    # localStorage keys
    @{ Old = "afl_cliente_nombre"; New = "${id}_cliente_nombre" },
    @{ Old = "afl_cliente_id";     New = "${id}_cliente_id" },
    @{ Old = "afl_salon_config";   New = "${id}_salon_config" },
    @{ Old = "afl_trial_start";    New = "${id}_trial_start" },
    @{ Old = "afl_admin_creds";    New = "${id}_admin_creds" },
    @{ Old = "afl_new_order";      New = "${id}_new_order" },
    @{ Old = "afl_plato_dia";      New = "${id}_plato_dia" },
    @{ Old = "afl_categories";     New = "${id}_categories" },
    @{ Old = "afl_products";       New = "${id}_products" },
    @{ Old = "afl_rewards";        New = "${id}_rewards" },
    @{ Old = "afl_promos";         New = "${id}_promos" },
    @{ Old = "afl_config";         New = "${id}_config" },
    @{ Old = "afl_orders";         New = "${id}_orders" },
    @{ Old = "afl_cli_";           New = "${id}_cli_" },
    # Firebase / RESTAURANT_ID
    @{ Old = "const RESTAURANT_ID = 'afl'"; New = "const RESTAURANT_ID = '$id'" },
    @{ Old = "const CAJA_RID = 'afl'";      New = "const CAJA_RID = '$id'" },
    @{ Old = "restaurantId: 'afl'";         New = "restaurantId: '$id'" },
    @{ Old = "restaurantId === 'afl'";      New = "restaurantId === '$id'" },
    @{ Old = "c.rid === 'afl'";             New = "c.rid === '$id'" },
    @{ Old = ".doc('afl')";                 New = ".doc('$id')" },
    # Email / alias
    @{ Old = "admin@afuegolento.com";       New = "admin@$slug.com" },
    @{ Old = "afuegolento.cbu";             New = "$slug.cbu" },
    # Nombre del restaurante (cubre titles, headers, mensajes WA, etc.)
    @{ Old = "A FUEGO LENTO";               New = $nombreUp },
    @{ Old = "A Fuego Lento";               New = $nombre }
)

$files = Get-ChildItem "$dst\*.html"
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw -Encoding UTF8
    foreach ($r in $replacements) {
        $content = $content.Replace($r.Old, $r.New)
    }
    Set-Content $f.FullName $content -Encoding UTF8 -NoNewline
    Write-Host "    Procesado: $($f.Name)" -ForegroundColor DarkGray
}

Write-Host "[2/3] Reemplazos aplicados." -ForegroundColor Green

# -- 3. Resumen final -----------------------------------------
Write-Host "[3/3] Listo." -ForegroundColor Green
Write-Host ""
Write-Host "========================================================" -ForegroundColor Yellow
Write-Host "  PASOS MANUALES RESTANTES" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "  A) LOGO" -ForegroundColor White
Write-Host "     Reemplaza clientes\$slug\logo.jpg con el logo del cliente."
Write-Host "     (mismo nombre de archivo, misma carpeta)"
Write-Host ""
Write-Host "  B) COLORES (opcional)" -ForegroundColor White
Write-Host "     Abri admin.html y carta-app.html, busca:"
Write-Host "       :root { --amber:"
Write-Host "     Cambia el color segun la identidad del local."
Write-Host ""
Write-Host "  C) GITHUB PAGES" -ForegroundColor White
Write-Host "     Subi la carpeta 'clientes\$slug\' al repo."
Write-Host "     Links del cliente:"
Write-Host "       Admin : https://brianinstalaciones-glitch.github.io/carta.digital/clientes/$slug/admin.html"
Write-Host "       Carta : https://brianinstalaciones-glitch.github.io/carta.digital/clientes/$slug/carta-app.html"
Write-Host ""
Write-Host "  D) SUPERADMIN - bloque para pegar en load():" -ForegroundColor White
Write-Host ""
$ts = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$today = (Get-Date -Format "yyyy-MM-dd")
Write-Host "     {" -ForegroundColor DarkCyan
Write-Host "       id: $ts," -ForegroundColor DarkCyan
Write-Host "       restaurante: '$nombre'," -ForegroundColor DarkCyan
Write-Host "       rid: '$id'," -ForegroundColor DarkCyan
Write-Host "       contacto: 'Propietario'," -ForegroundColor DarkCyan
Write-Host "       ciudad: 'Merlo, San Luis'," -ForegroundColor DarkCyan
Write-Host "       whatsapp: '549266XXXXXXX'," -ForegroundColor DarkCyan
Write-Host "       email: 'admin@$slug.com'," -ForegroundColor DarkCyan
Write-Host "       password: 'demo1234'," -ForegroundColor DarkCyan
Write-Host "       trialStart: '$today'," -ForegroundColor DarkCyan
Write-Host "       estado: 'trial'," -ForegroundColor DarkCyan
Write-Host "       features: { salon: true, club: true, caja: true }," -ForegroundColor DarkCyan
Write-Host "       notas: ''" -ForegroundColor DarkCyan
Write-Host "     }," -ForegroundColor DarkCyan
Write-Host ""
Write-Host "  E) CREDENCIALES INICIALES" -ForegroundColor White
Write-Host "     Usuario  : admin@$slug.com"
Write-Host "     Password : demo1234"
Write-Host "     (el cliente lo cambia desde Config > Seguridad)"
Write-Host ""
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Cliente '$nombre' ($id) creado!" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

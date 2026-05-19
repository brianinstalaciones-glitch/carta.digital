// ═══════════════════════════════════════════════════════════
//  De Otro Mundo — Capa de datos (localStorage)
// ═══════════════════════════════════════════════════════════

const DOM_RESTAURANT_ID = 'dom';
const RESTAURANT_ID     = 'dom';

const LS_DATA    = 'deotromundo_data_v1';
const LS_ORDERS  = 'deotromundo_pedidos_v1';
const LS_CLIENTS = 'deotromundo_clientes_v1';

// ─── MENÚ POR DEFECTO ───────────────────────────────────────
const DEFAULT_DATA = {
  config: {
    nombre:          'De Otro Mundo',
    subtitulo:       'Empanadas & Milanesas',
    whatsapp:        '5492664684434',
    whatsappVisible: '2664 684434',
    instagram:       'deotromundo_empanadas',
    costoEnvio:      0,
    abierto:         true,
    delivery:        true,
    retiro:          true,
    mesa:            true,
    cantidadMesas:          10,
    descuentoEfectivo:      0,
    descuentoEfectivoActivo:false,
    transferAlias:          '',
    transferCBU:            '',
    menuVersion:            3,
  },
  puntos: {
    activo:        false,
    puntosPorMonto:500,
    minimoCanje:   0,
    bienvenida:    0,
    diasDobles:    [],
  },
  recompensas: [],
  categorias: [
    { id:'empanadas',  nombre:'Empanadas',        icon:'lunch_dining', orden:1 },
    { id:'emp_dulces', nombre:'Dulces',            icon:'lunch_dining', orden:2 },
    { id:'milanesas',  nombre:'Milanesas',         icon:'restaurant',   orden:3 },
    { id:'combos',     nombre:'Combos',            icon:'local_offer',  orden:4 },
    { id:'bebidas',    nombre:'Bebidas',           icon:'local_bar',    orden:5 },
    { id:'promos',     nombre:'Promos',            icon:'percent',      orden:6 },
  ],
  productos: [
    // ── EMPANADAS SALADAS ─────────────────────────────────────
    { id:'emp01', cat:'empanadas', nombre:'Salmón Rosado',       desc:'Salmón rosado, sésamo tostado, queso crema y salsa teriyaki.',                              precio:0, activo:true,  destacado:true,  aclaraciones:['Al horno','Fritas'] },
    { id:'emp02', cat:'empanadas', nombre:'Camarones',           desc:'Camarones al ajillo y queso mozzarella.',                                                   precio:0, activo:true,  destacado:true,  aclaraciones:['Al horno','Fritas'] },
    { id:'emp03', cat:'empanadas', nombre:'Peras Caramelizadas', desc:'Peras, queso Azul, mozzarella, apio y nueces.',                                             precio:0, activo:true,  destacado:true,  aclaraciones:['Al horno','Fritas'] },
    { id:'emp04', cat:'empanadas', nombre:'Brócoli',             desc:'Brócoli, jamón crudo, mozzarella y salsa blanca.',                                          precio:0, activo:true,  destacado:false, aclaraciones:['Al horno','Fritas'] },
    { id:'emp05', cat:'empanadas', nombre:'Tomates Confitados',  desc:'Tomates confitados, mozzarella, albahaca y olivas negras.',                                 precio:0, activo:true,  destacado:false, aclaraciones:['Al horno','Fritas'] },
    { id:'emp06', cat:'empanadas', nombre:'Cebolla',             desc:'Cebolla blanca, morada, verdeo y mozzarella.',                                              precio:0, activo:true,  destacado:false, aclaraciones:['Al horno','Fritas'] },
    { id:'emp07', cat:'empanadas', nombre:'Provoleta',           desc:'Provoleta, mozzarella, roquefort y parmesano.',                                             precio:0, activo:true,  destacado:false, aclaraciones:['Al horno','Fritas'] },
    { id:'emp08', cat:'empanadas', nombre:'Estilo Norteño',      desc:'Carne cortada a cuchillo al estilo norteño.',                                               precio:0, activo:true,  destacado:false, aclaraciones:['Al horno','Fritas'] },
    { id:'emp09', cat:'empanadas', nombre:'Carne Criolla',       desc:'Carne criolla con un toque distinto.',                                                      precio:0, activo:true,  destacado:false, aclaraciones:['Al horno','Fritas'] },
    { id:'emp10', cat:'empanadas', nombre:'Vacío Ahumado',       desc:'Vacío ahumado en cocción lenta y queso provoleta.',                                         precio:0, activo:true,  destacado:true,  aclaraciones:['Al horno','Fritas'] },
    { id:'emp11', cat:'empanadas', nombre:'Matambre',            desc:'Matambre Tiernito a la pizza.',                                                             precio:0, activo:true,  destacado:false, aclaraciones:['Al horno','Fritas'] },
    { id:'emp12', cat:'empanadas', nombre:'Cheese Burger',       desc:'Hamburguesa, queso cheddar, panceta y pepinillo.',                                          precio:0, activo:true,  destacado:false, aclaraciones:['Al horno','Fritas'] },
    { id:'emp13', cat:'empanadas', nombre:'Osobuco',             desc:'Osobuco en reducción de Malbec.',                                                           precio:0, activo:true,  destacado:true,  aclaraciones:['Al horno','Fritas'] },
    { id:'emp14', cat:'empanadas', nombre:'Bondiola Braseada',   desc:'Bondiola braseada, cebolla confitada, panceta ahumada y barbacoa casera.',                  precio:0, activo:true,  destacado:true,  aclaraciones:['Al horno','Fritas'] },
    { id:'emp15', cat:'empanadas', nombre:'Cordero',             desc:'Cordero confitado, hierbas y queso fundido.',                                               precio:0, activo:true,  destacado:true,  aclaraciones:['Al horno','Fritas'] },
    { id:'emp16', cat:'empanadas', nombre:'Mexican Chili',       desc:'Frijoles, carne tiernita, nachos y un toque de cilantro.',                                  precio:0, activo:true,  destacado:false, aclaraciones:['Al horno','Fritas'] },
    { id:'emp17', cat:'empanadas', nombre:'Pollo con Hongos',    desc:'Pollo en crema de hongos.',                                                                 precio:0, activo:true,  destacado:false, aclaraciones:['Al horno','Fritas'] },
    { id:'emp18', cat:'empanadas', nombre:'Pollo Curri',         desc:'Pollo en crema de curri y piña asada.',                                                     precio:0, activo:true,  destacado:false, aclaraciones:['Al horno','Fritas'] },
    // ── EMPANADAS DULCES ──────────────────────────────────────
    { id:'emd01', cat:'emp_dulces', nombre:'Dulce de Leche y Banana',   desc:'Dulce de leche, banana caramelizada, chocolate y coco.',                             precio:0, activo:true,  destacado:false, aclaraciones:['Al horno','Fritas'] },
    { id:'emd02', cat:'emp_dulces', nombre:'Dulce de Leche y Cerezas',  desc:'Dulce de leche, cerezas, nueces y ron.',                                             precio:0, activo:true,  destacado:false, aclaraciones:['Al horno','Fritas'] },
    { id:'emd03', cat:'emp_dulces', nombre:'Pastelera Clásica',         desc:'Pastelera clásica y frutos rojos del Bolsón.',                                       precio:0, activo:true,  destacado:false, aclaraciones:['Al horno','Fritas'] },
    { id:'emd04', cat:'emp_dulces', nombre:'Higos en Almíbar',          desc:'Higos en almíbar, ricota, queso crema y naranjas.',                                  precio:0, activo:true,  destacado:false, aclaraciones:['Al horno','Fritas'] },
    // ── MILANESAS ────────────────────────────────────────────
    { id:'mil01', cat:'milanesas', nombre:'Napolitana',        desc:'Ternera, salsa de tomate, muzzarella, jamón cocido natural, rodajas de tomate, ajo y perejil. Con papas.',              precio:0, activo:true,  destacado:true  },
    { id:'mil02', cat:'milanesas', nombre:'Americana',         desc:'Ternera, salsa de tomate, muzzarella, queso cheddar, panceta crispy y huevo frito. Con papas.',                         precio:0, activo:true,  destacado:true  },
    { id:'mil03', cat:'milanesas', nombre:'De Mare',           desc:'Ternera, salsa de tomate, muzzarella y camarones al ajillo. Con papas.',                                                precio:0, activo:true,  destacado:true  },
    { id:'mil04', cat:'milanesas', nombre:'A Puro Hongos',     desc:'Ternera, salsa de tomate, muzzarella y mix de hongos salteados con ajo y oliva. Con papas.',                            precio:0, activo:true,  destacado:false },
    { id:'mil05', cat:'milanesas', nombre:'Italiana',          desc:'Ternera, salsa de tomate, muzzarella, jamón crudo, tomates confitados, albahaca y olivas negras. Con papas.',           precio:0, activo:true,  destacado:false },
    { id:'mil06', cat:'milanesas', nombre:'A Puro Queso',      desc:'Ternera, salsa de tomate, muzzarella, roquefort, provoleta y parmesano. Con papas.',                                    precio:0, activo:true,  destacado:false },
    { id:'mil07', cat:'milanesas', nombre:'Clásica a Caballo', desc:'Ternera y huevo frito. Con papas.',                                                                                     precio:0, activo:true,  destacado:false },
    // ── COMBOS ───────────────────────────────────────────────
    { id:'com1', cat:'combos', nombre:'Media Docena',    desc:'6 empanadas a elección (fritas o al horno).',              precio:0, activo:true, destacado:false },
    { id:'com2', cat:'combos', nombre:'Docena',          desc:'12 empanadas a elección — la opción del clan.',            precio:0, activo:true, destacado:true  },
    { id:'com3', cat:'combos', nombre:'Combo Clásico',   desc:'6 empanadas + bebida 500ml.',                              precio:0, activo:true, destacado:false },
    { id:'com4', cat:'combos', nombre:'Combo Familiar',  desc:'12 empanadas + 2 bebidas.',                                precio:0, activo:true, destacado:true  },
    { id:'com5', cat:'combos', nombre:'Combo Mila',      desc:'Milanesa napolitana + bebida 500ml.',                      precio:0, activo:true, destacado:false },
    // ── BEBIDAS ──────────────────────────────────────────────
    { id:'beb1', cat:'bebidas', nombre:'Coca-Cola 500ml',   desc:'',                        precio:0, activo:true, destacado:false },
    { id:'beb2', cat:'bebidas', nombre:'Agua Mineral',      desc:'',                        precio:0, activo:true, destacado:false },
    { id:'beb3', cat:'bebidas', nombre:'Jugo Natural',      desc:'Naranja, pomelo o limón', precio:0, activo:true, destacado:false },
    { id:'beb4', cat:'bebidas', nombre:'Cerveza 473ml',     desc:'Latón fría',              precio:0, activo:true, destacado:false },
    // ── PROMOS ───────────────────────────────────────────────
    { id:'pro1', cat:'promos', nombre:'Promo del Día', desc:'Consultá las promos del día con nuestro equipo.', precio:0, activo:true, destacado:false },
  ],
};

// ─── CARGA / GUARDA ─────────────────────────────────────────
function DOM_loadData() {
  try {
    const raw = localStorage.getItem(LS_DATA);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
    const d = JSON.parse(raw);
    if (!d.config)      d.config      = { ...DEFAULT_DATA.config };
    if (!d.categorias)  d.categorias  = [...DEFAULT_DATA.categorias];
    if (!d.productos)   d.productos   = [...DEFAULT_DATA.productos];
    if (!d.puntos)      d.puntos      = { ...DEFAULT_DATA.puntos };
    if (!d.recompensas) d.recompensas = [];
    // Migrar menú si es versión anterior
    let dirty = false;
    if ((d.config.menuVersion || 1) < DEFAULT_DATA.config.menuVersion) {
      d.categorias = JSON.parse(JSON.stringify(DEFAULT_DATA.categorias));
      d.productos  = JSON.parse(JSON.stringify(DEFAULT_DATA.productos));
      d.config.menuVersion = DEFAULT_DATA.config.menuVersion;
      dirty = true;
    }
    // Migrar datos de contacto si siguen con valores placeholder
    if (d.config.whatsapp === '5492664000000')      { d.config.whatsapp        = '5492664684434';       dirty = true; }
    if (d.config.whatsappVisible === '2664 000000') { d.config.whatsappVisible = '2664 684434';         dirty = true; }
    if (d.config.instagram === 'deotromundo')       { d.config.instagram       = 'deotromundo_empanadas'; dirty = true; }
    if (dirty) localStorage.setItem(LS_DATA, JSON.stringify(d));
    return d;
  } catch(e) { return JSON.parse(JSON.stringify(DEFAULT_DATA)); }
}

function DOM_saveData(d) {
  localStorage.setItem(LS_DATA, JSON.stringify(d));
  window.dispatchEvent(new CustomEvent('deotromundo:data'));
}

function DOM_resetData() {
  localStorage.removeItem(LS_DATA);
  window.dispatchEvent(new CustomEvent('deotromundo:data'));
}

// ─── PEDIDOS ────────────────────────────────────────────────
function DOM_loadOrders() {
  try { return JSON.parse(localStorage.getItem(LS_ORDERS) || '[]'); }
  catch(e) { return []; }
}

function DOM_saveOrder(order) {
  const orders = DOM_loadOrders();
  orders.unshift(order);
  localStorage.setItem(LS_ORDERS, JSON.stringify(orders));
  // Auto-abrir mesa si el primer pedido llega de la carta sin que el admin la abra
  if (order.modo === 'mesa' && order.mesa) {
    const tables = DOM_loadTables();
    const t = tables[String(order.mesa)];
    if (!t || t.estado === 'libre' || !t.fechaApertura) {
      tables[String(order.mesa)] = { estado: 'ocupada', fechaApertura: order.fecha };
      localStorage.setItem(LS_TABLES, JSON.stringify(tables));
      window.dispatchEvent(new CustomEvent('deotromundo:mesas'));
    }
  }
  window.dispatchEvent(new CustomEvent('deotromundo:orders'));
}

function DOM_nextOrderNumber() {
  const orders = DOM_loadOrders();
  return orders.reduce((m, o) => Math.max(m, o.numero || 0), 0) + 1;
}

// ─── MESAS ──────────────────────────────────────────────────
function DOM_setTablesCount(v) {
  const n = Math.max(1, Math.min(60, parseInt(v, 10) || 10));
  const d = DOM_loadData();
  d.config.cantidadMesas = n;
  DOM_saveData(d);
}

// ─── CLIENTES ───────────────────────────────────────────────
function DOM_loadClientes() {
  try { return JSON.parse(localStorage.getItem(LS_CLIENTS) || '{}'); }
  catch(e) { return {}; }
}

function DOM_saveClientes(all) {
  localStorage.setItem(LS_CLIENTS, JSON.stringify(all));
  window.dispatchEvent(new CustomEvent('deotromundo:clientes'));
}

function DOM_normalizeTel(t) {
  return (t || '').replace(/\D/g, '').replace(/^0+/, '');
}

function DOM_getCliente(tel) {
  const key = DOM_normalizeTel(tel);
  if (!key) return null;
  return DOM_loadClientes()[key] || null;
}

function DOM_upsertCliente(tel, nombre) {
  const key = DOM_normalizeTel(tel);
  if (!key || key.length < 8) return;
  const all = DOM_loadClientes();
  if (!all[key]) {
    const d = DOM_loadData();
    const bienvenida = (d.puntos && d.puntos.activo) ? (d.puntos.bienvenida || 0) : 0;
    all[key] = { telefono: key, nombre: nombre || '', puntos: bienvenida, pedidos: 0, totalGastado: 0 };
  } else if (nombre && !all[key].nombre) {
    all[key].nombre = nombre;
  }
  DOM_saveClientes(all);
}

function DOM_applyOrderToCliente(order) {
  const tel = DOM_normalizeTel(order.cliente && order.cliente.telefono);
  if (!tel || tel.length < 8) return null;
  const all = DOM_loadClientes();
  if (!all[tel]) {
    all[tel] = { telefono: tel, nombre: (order.cliente && order.cliente.nombre) || '', puntos: 0, pedidos: 0, totalGastado: 0 };
  }
  const c = all[tel];
  c.pedidos      = (c.pedidos      || 0) + 1;
  c.totalGastado = (c.totalGastado || 0) + (order.subtotal || 0);
  c.puntos       = (c.puntos       || 0) + (order.puntosGanados || 0) - (order.puntosCanjeados || 0);
  if (c.puntos < 0) c.puntos = 0;
  DOM_saveClientes(all);
  return { saldo: c.puntos };
}

// ─── PUNTOS ─────────────────────────────────────────────────
function DOM_calcPuntosGanados(subtotal) {
  const d = DOM_loadData();
  const p = d.puntos;
  if (!p || !p.activo) return 0;
  const ganados = Math.floor(subtotal / (p.puntosPorMonto || 500));
  return DOM_isDoubleDay() ? ganados * 2 : ganados;
}

function DOM_isDoubleDay() {
  const d = DOM_loadData();
  const dias = (d.puntos && d.puntos.diasDobles) || [];
  return dias.includes(new Date().getDay());
}

// ─── ACTUALIZAR PEDIDO ──────────────────────────────────────
function DOM_updateOrder(id, changes) {
  const orders = DOM_loadOrders();
  const idx = orders.findIndex(o => o.id === id);
  if (idx === -1) return;
  Object.assign(orders[idx], changes);
  localStorage.setItem(LS_ORDERS, JSON.stringify(orders));
  window.dispatchEvent(new CustomEvent('deotromundo:orders'));
}

// ─── MESAS ──────────────────────────────────────────────────
const LS_TABLES = 'deotromundo_tables_v1';

function DOM_loadTables() {
  const d = DOM_loadData();
  const count = d.config.cantidadMesas || 10;
  let tables = {};
  try { tables = JSON.parse(localStorage.getItem(LS_TABLES) || '{}'); } catch(e) {}
  for (let i = 1; i <= count; i++) {
    if (!tables[String(i)]) tables[String(i)] = { estado: 'libre', fechaApertura: null };
  }
  return tables;
}

function DOM_saveTables(tables) {
  localStorage.setItem(LS_TABLES, JSON.stringify(tables));
  window.dispatchEvent(new CustomEvent('deotromundo:mesas'));
}

function DOM_getTableOpenOrders(num) {
  return DOM_loadOrders().filter(o =>
    o.modo === 'mesa' &&
    String(o.mesa) === String(num) &&
    o.estado !== 'entregado' &&
    o.estado !== 'cancelado'
  );
}

function DOM_openTable(num) {
  const tables = DOM_loadTables();
  tables[String(num)] = { estado: 'ocupada', fechaApertura: new Date().toISOString() };
  DOM_saveTables(tables);
}

function DOM_askBillTable(num) {
  const tables = DOM_loadTables();
  if (tables[String(num)]) { tables[String(num)].estado = 'cuenta'; DOM_saveTables(tables); }
}

function DOM_closeTable(num) {
  const orders = DOM_getTableOpenOrders(num);
  orders.forEach(o => DOM_updateOrder(o.id, { estado: 'entregado' }));
  const tables = DOM_loadTables();
  tables[String(num)] = { estado: 'libre', fechaApertura: null };
  DOM_saveTables(tables);
}

// ─── CAJA ───────────────────────────────────────────────────
const LS_CAJA = 'deotromundo_caja_v1';

function DOM_loadCajaState() {
  try { return JSON.parse(localStorage.getItem(LS_CAJA) || '{"abierta":true,"hora":null}'); }
  catch(e) { return { abierta: true, hora: null }; }
}
function DOM_saveCajaState(state) {
  localStorage.setItem(LS_CAJA, JSON.stringify(state));
}

// ─── LICENCIA (escrita por el Super Admin con rid_license) ──────
const LS_LICENSE = RESTAURANT_ID + '_license';

function DOM_loadLicense()    { try { return JSON.parse(localStorage.getItem(LS_LICENSE)); } catch(e) { return null; } }
function DOM_saveLicense(lic) { localStorage.setItem(LS_LICENSE, JSON.stringify(lic)); }
function DOM_isModuleEnabled(mod) {
  const lic = DOM_loadLicense();
  if (!lic) return true; // sin licencia = todo habilitado (instalación nueva o sin restricciones)
  return lic[mod] !== false;
}

// ─── FORMATO ────────────────────────────────────────────────
function DOM_fmtPrice(n) {
  return '$' + (n || 0).toLocaleString('es-AR');
}

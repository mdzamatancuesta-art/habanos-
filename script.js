// =========================================
// EL MUNDO DEL HABANO — SPA
// =========================================

const state = {
  ageVerified: sessionStorage.getItem('emh_age') === '1',
  user: null,
  lang: 'es',
  currentView: null,
};

// Vitolas data
const VITOLAS = [
  { id:1,  marca:'Cohiba',      nombre:'Cohiba Lancero',      cepo:38, longitud:192, tripa:'larga', fortaleza:0.65, cat:'regular',     color:'#1a1a1a', bandColor:'#C9A84C' },
  { id:2,  marca:'Cohiba',      nombre:'Cohiba Siglo VI',     cepo:52, longitud:150, tripa:'larga', fortaleza:0.72, cat:'regular',     color:'#1a1a1a', bandColor:'#C9A84C' },
  { id:3,  marca:'Cohiba',      nombre:'Cohiba Ambar',        cepo:34, longitud:110, tripa:'larga', fortaleza:0.55, cat:'regular',     color:'#1a1a1a', bandColor:'#C9A84C' },
  { id:4,  marca:'Montecristo', nombre:'Monte No.2',          cepo:52, longitud:156, tripa:'larga', fortaleza:0.68, cat:'regular',     color:'#6B0000', bandColor:'#FFD700' },
  { id:5,  marca:'Montecristo', nombre:'Monte No.4',          cepo:42, longitud:129, tripa:'larga', fortaleza:0.60, cat:'regular',     color:'#6B0000', bandColor:'#FFD700' },
  { id:6,  marca:'Romeo',       nombre:'Churchill',           cepo:47, longitud:178, tripa:'larga', fortaleza:0.58, cat:'regular',     color:'#3d0070', bandColor:'#C9A84C' },
  { id:7,  marca:'Partagás',    nombre:'Serie D No.4',        cepo:50, longitud:124, tripa:'larga', fortaleza:0.80, cat:'regular',     color:'#8B0000', bandColor:'#C9A84C' },
  { id:8,  marca:'Partagás',    nombre:'Serie P No.2',        cepo:52, longitud:156, tripa:'larga', fortaleza:0.82, cat:'regular',     color:'#8B0000', bandColor:'#C9A84C' },
  { id:9,  marca:'H. Upmann',   nombre:'Magnum 54',           cepo:54, longitud:135, tripa:'larga', fortaleza:0.55, cat:'regular',     color:'#1A3A6B', bandColor:'#C9A84C' },
  { id:10, marca:'Bolivar',     nombre:'Royal Corona',        cepo:42, longitud:117, tripa:'larga', fortaleza:0.85, cat:'regular',     color:'#1A1A1A', bandColor:'#C9A84C' },
  { id:11, marca:'Cohiba',      nombre:'Cohiba 1966 L.E.',    cepo:52, longitud:166, tripa:'larga', fortaleza:0.70, cat:'limitadas',   color:'#1a1a1a', bandColor:'#C9A84C' },
  { id:12, marca:'Romeo',       nombre:'Wide Churchill G.R.', cepo:55, longitud:135, tripa:'larga', fortaleza:0.60, cat:'granreserva', color:'#3d0070', bandColor:'#C9A84C' },
  { id:13, marca:'Cohiba',      nombre:'Cohiba Reserva',      cepo:50, longitud:150, tripa:'larga', fortaleza:0.75, cat:'reserva',     color:'#1a1a1a', bandColor:'#C9A84C' },
  { id:14, marca:'Montecristo', nombre:'Monte Regional 2024', cepo:50, longitud:156, tripa:'larga', fortaleza:0.68, cat:'regionales',  color:'#6B0000', bandColor:'#FFD700' },
];

// Articles content
const ARTICLES = {
  '1-0': {
    ch: 'Capítulo 1. Introducción',
    title: 'El Mejor Tabaco del Mundo',
    body: `<p>En el mundo del tabaco existe una denominación de origen sin igual: el Habano. Producido exclusivamente en Cuba, este cigarro premium representa la cima de la artesanía tabacalera mundial, reconocido por los paladares más exigentes del planeta.</p>
      <p>Tres factores hacen al Habano irrepetible: el terruño cubano —especialmente la región de Vuelta Abajo en Pinar del Río—, el conocimiento ancestral de sus maestros torcedores y la hoja de tabaco negro cubano, la más aromática y compleja del mundo.</p>
      <p>En 2026, el Habano sigue siendo el referente absoluto del tabaco premium. Las marcas que componen el portafolio de Habanos S.A. ofrecen más de 500 vitolas distintas, cada una con su personalidad única.</p>`,
    pullQuote: 'El Habano: una referencia de perfección.',
  },
  '2-1': {
    ch: 'Capítulo 2. Composición y origen del tabaco',
    title: 'Anatomía de un Habano',
    sub: 'PARTES DEL HABANO',
    anatomy: true,
    body: `<p>Un habano se compone de tres partes fundamentales, cada una con un papel específico en la experiencia final del fumador. La armonía entre capa, capote y tripa determina el carácter único de cada vitola.</p>`,
  },
  '2-2': {
    ch: 'Capítulo 2. Composición y origen del tabaco',
    title: 'El Paraíso del Tabaco',
    sub: 'CUBA Y SU TERROIR',
    body: `<p>Vuelta Abajo, en la provincia de Pinar del Río, es reconocida unánimemente como la mejor región tabacalera del mundo. Su suelo único crea condiciones imposibles de replicar en ningún otro lugar.</p>
      <p>El microclima de la región, con sus temperaturas moderadas y la influencia de las brisas del Caribe, permite que las plantas de tabaco desarrollen aceites esenciales únicos.</p>`,
  },
};

// =========================================
// NAVIGATION
// =========================================
function navigate(view, params = {}) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active-nav'));
  const activeLink = document.querySelector(`.nav-link[data-view="${view}"]`);
  if (activeLink) activeLink.classList.add('active-nav');

  const target = document.getElementById(`view-${view}`);
  if (!target) return;
  target.classList.add('active');
  state.currentView = view;

  if (view === 'vitolario') renderVitolas('regular');
  if (view === 'article') renderArticle(params.ch, params.sub);

  window.scrollTo(0, 0);
}

function confirmAge() {
  sessionStorage.setItem('emh_age', '1');
  state.ageVerified = true;
  navigate('home');
}

// =========================================
// VITOLARIO
// =========================================
let currentCat = 'regular';

function setCat(btn, cat) {
  currentCat = cat;
  document.querySelectorAll('.ctab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const descriptions = {
    regular: 'Habanos de producción regular, son los considerados productos standard y con una aparición regular en los mercados.',
    granreserva: 'Ediciones de Gran Reserva: habanos elaborados con las hojas de mayor calidad seleccionadas de cosechas específicas.',
    reserva: 'Habanos elaborados con tabaco añejado bajo rigurosas condiciones de selección.',
    limitadas: 'Ediciones Limitadas: lanzadas anualmente con vitolas exclusivas de producción restringida.',
    casahabano: 'Exclusivos de las tiendas Casa del Habano en todo el mundo.',
    regionales: 'Ediciones producidas exclusivamente para mercados concretos de distribución.',
    anejados: 'Habanos sometidos a un proceso de añejamiento mínimo de 5 años en condiciones controladas.',
    vintage: 'Habanos Vintage: cosechas de años específicos reconocidos por sus excepcionales condiciones.',
    especialistas: 'Líneas exclusivas disponibles únicamente en tiendas Especialistas en Habanos.',
  };

  const desc = document.querySelector('.cat-desc-txt');
  if (desc) desc.textContent = descriptions[cat] || '';

  renderVitolas(cat);
}

function renderVitolas(cat) {
  const container = document.getElementById('vitolasVisual');
  if (!container) return;

  const filtered = VITOLAS.filter(v => v.cat === cat);
  if (!filtered.length) {
    container.innerHTML = `<p style="color:rgba(255,255,255,0.3);font-size:0.8rem;padding:2rem 0">No hay vitolas en esta categoría aún.</p>`;
    return;
  }

  container.innerHTML = filtered.map(v => {
    const heightPx = Math.round((v.longitud / 192) * 130);
    const bandTop = Math.round(heightPx * 0.3);
    return `
      <div class="vitola-card" onclick="showVitola(${v.id})">
        <div class="vitola-cigar" style="height:${heightPx + 30}px">
          <div class="vitola-cigar-body" style="height:${heightPx}px;width:${Math.round(v.cepo * 0.38)}px;--cigar-color:${v.color}">
            <div class="vitola-band" style="top:${bandTop}px;background:${v.bandColor}"></div>
            <div class="vitola-num">${v.cepo}</div>
          </div>
        </div>
        <div class="vitola-label">${v.nombre}</div>
        <div class="vitola-marca">${v.marca}</div>
      </div>`;
  }).join('');
}

function showVitola(id) {
  const v = VITOLAS.find(x => x.id === id);
  if (!v) return;

  const heightPx = Math.round((v.longitud / 192) * 160);
  const img = document.getElementById('detailCigarImg');
  if (img) {
    img.style.cssText = `width:${Math.round(v.cepo * 0.42)}px;min-height:${heightPx}px;background:linear-gradient(to right,${v.color},${lighten(v.color)},${v.color});border-radius:${Math.round(v.cepo*0.21)}px ${Math.round(v.cepo*0.21)}px 4px 4px;box-shadow:-4px 0 8px rgba(0,0,0,0.5);position:relative;`;
  }

  const el = (id2) => document.getElementById(id2);
  if (el('detailMarca')) el('detailMarca').textContent = `${v.marca} · ${catLabel(v.cat)}`;
  if (el('detailNombre')) el('detailNombre').textContent = v.nombre.toUpperCase();
  if (el('detailBadge')) el('detailBadge').textContent = v.cepo;

  const fza = document.querySelector('.fza-fill');
  if (fza) fza.style.width = (v.fortaleza * 100) + '%';

  if (el('detailSpecs')) el('detailSpecs').innerHTML = `
    <tr><td>Cepo:</td><td>${v.cepo}</td></tr>
    <tr><td>Longitud:</td><td>${v.longitud} mm</td></tr>
    <tr><td>Relleno:</td><td>Tripa ${v.tripa}</td></tr>
  `;
}

function lighten(hex) {
  const n = parseInt(hex.replace('#',''), 16);
  const r = Math.min(255, ((n>>16)&0xff) + 40);
  const g = Math.min(255, ((n>>8)&0xff)  + 30);
  const b = Math.min(255, (n&0xff)        + 20);
  return `rgb(${r},${g},${b})`;
}

function catLabel(cat) {
  const labels = {
    regular: 'Catálogo Regular', granreserva: 'Gran Reserva', reserva: 'Reserva',
    limitadas: 'Edición Limitada', casahabano: 'Casa del Habano', regionales: 'Edición Regional',
    anejados: 'Añejados', vintage: 'Habanos Vintage', especialistas: 'Especialistas',
  };
  return labels[cat] || cat;
}

// =========================================
// ÍNDICE
// =========================================
function toggleChapter(btn) {
  const item = btn.closest('.ch-item');
  const sub = item.querySelector('.sub-ch');
  const leer = btn.querySelector('.ch-leer');
  const isOpen = btn.classList.contains('open');

  // Close all
  document.querySelectorAll('.ch-row.open').forEach(b => {
    b.classList.remove('open');
    const s = b.closest('.ch-item').querySelector('.sub-ch');
    const l = b.querySelector('.ch-leer');
    if (s) s.classList.add('hidden');
    if (l) l.classList.add('hidden');
  });

  if (!isOpen) {
    btn.classList.add('open');
    if (sub) sub.classList.remove('hidden');
    if (leer) leer.classList.remove('hidden');
  }
}

// =========================================
// ARTICLE
// =========================================
function renderArticle(ch, sub) {
  const key = `${ch}-${sub}`;
  const art = ARTICLES[key];
  const layout = document.getElementById('articleLayout');
  if (!layout) return;

  if (!art) {
    layout.innerHTML = `<p style="color:#888;font-size:0.85rem">Contenido próximamente.</p>`;
    return;
  }

  const breadcrumb = document.getElementById('articleBreadcrumb');
  if (breadcrumb) {
    breadcrumb.innerHTML = `<button onclick="navigate('indice')">Índice</button> › ${art.ch || ''}`;
  }

  if (art.anatomy) {
    layout.innerHTML = `
      <p class="art-chapter">${art.ch || ''}</p>
      <h1 class="art-title">${art.title}</h1>
      ${art.sub ? `<p class="section-tag">${art.sub}</p>` : ''}
      <div class="anatomy-grid">
        <div class="anatomy-cigar"></div>
        <ul class="anatomy-list">
          <li><strong>Capa</strong> — Hoja exterior que envuelve el habano, de la mejor calidad.</li>
          <li><strong>Capote</strong> — Hoja intermedia que mantiene unida la tripa.</li>
          <li><strong>Tripa</strong> — El corazón del habano, mezcla de hojas de distintas calidades.</li>
        </ul>
      </div>
      <div class="art-body">${art.body}</div>`;
    return;
  }

  layout.innerHTML = `
    <p class="art-chapter">${art.ch || ''}</p>
    <h1 class="art-title">${art.title}</h1>
    ${art.sub ? `<p class="section-tag">${art.sub}</p>` : ''}
    <div class="art-body">${art.body}</div>
    ${art.pullQuote ? `<blockquote class="art-pullquote">${art.pullQuote}</blockquote>` : ''}`;
}

// =========================================
// REGISTER / LOGIN
// =========================================
function showRegStep2(hasBook) {
  const step2 = document.getElementById('regStep2');
  if (!step2) return;
  if (hasBook) {
    step2.classList.remove('hidden');
  } else {
    step2.classList.add('hidden');
  }
}

function doRegister() {
  state.user = { type: 'invitado', email: 'nuevo@habano.com' };
  unlockNav();
  navigate('home');
}

function doLogin() {
  state.user = { type: 'propietario', email: 'habano1@gmail.com' };
  unlockNav();
  navigate('home');
}

function doLogout() {
  state.user = null;
  lockNav();
  navigate('home');
}

function unlockNav() {
  document.querySelectorAll('.nav-locked').forEach(b => {
    b.classList.remove('nav-locked');
  });
}

function lockNav() {
  const navIndice = document.getElementById('navIndice');
  const navCol = document.getElementById('navColeccionista');
  if (navIndice) navIndice.classList.add('nav-locked');
  if (navCol) navCol.classList.add('nav-locked');
}

// =========================================
// LANGUAGE
// =========================================
function setLang(lang) {
  state.lang = lang;
  document.getElementById('langEs').classList.toggle('active', lang === 'es');
  document.getElementById('langEn').classList.toggle('active', lang === 'en');
}

// =========================================
// INIT
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  if (state.ageVerified) {
    navigate('home');
  } else {
    navigate('agegate');
  }
});

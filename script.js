// =========================================
// EL MUNDO DEL HABANO — SPA
// =========================================

// State
const state = {
  ageVerified: sessionStorage.getItem('emh_age') === '1',
  user: null, // null | { type: 'curioso'|'invitado'|'propietario', email }
  lang: 'es',
  currentView: null,
};

// Vitolas data
const VITOLAS = [
  { id:1, marca:'Cohiba', nombre:'Cohiba Lancero',     cepo:38, longitud:192, tripa:'larga', fortaleza:0.65, cat:'regular',   color:'#1a1a1a', bandColor:'#C9A84C', num:38 },
  { id:2, marca:'Cohiba', nombre:'Cohiba Siglo VI',    cepo:52, longitud:150, tripa:'larga', fortaleza:0.72, cat:'regular',   color:'#1a1a1a', bandColor:'#C9A84C', num:52 },
  { id:3, marca:'Cohiba', nombre:'Cohiba Ambar',       cepo:34, longitud:110, tripa:'larga', fortaleza:0.55, cat:'regular',   color:'#1a1a1a', bandColor:'#C9A84C', num:34 },
  { id:4, marca:'Montecristo', nombre:'Monte No.2',    cepo:52, longitud:156, tripa:'larga', fortaleza:0.68, cat:'regular',   color:'#6B0000', bandColor:'#FFD700', num:52 },
  { id:5, marca:'Montecristo', nombre:'Monte No.4',    cepo:42, longitud:129, tripa:'larga', fortaleza:0.60, cat:'regular',   color:'#6B0000', bandColor:'#FFD700', num:42 },
  { id:6, marca:'Romeo',  nombre:'Churchill',          cepo:47, longitud:178, tripa:'larga', fortaleza:0.58, cat:'regular',   color:'#4B0082', bandColor:'#C9A84C', num:47 },
  { id:7, marca:'Partagás', nombre:'Serie D No.4',     cepo:50, longitud:124, tripa:'larga', fortaleza:0.80, cat:'regular',   color:'#8B0000', bandColor:'#C9A84C', num:50 },
  { id:8, marca:'Partagás', nombre:'Serie P No.2',     cepo:52, longitud:156, tripa:'larga', fortaleza:0.82, cat:'regular',   color:'#8B0000', bandColor:'#C9A84C', num:52 },
  { id:9, marca:'H. Upmann', nombre:'Magnum 54',       cepo:54, longitud:135, tripa:'larga', fortaleza:0.55, cat:'regular',   color:'#1A3A6B', bandColor:'#C9A84C', num:54 },
  { id:10, marca:'Bolivar', nombre:'Royal Corona',     cepo:42, longitud:117, tripa:'larga', fortaleza:0.85, cat:'regular',   color:'#1A1A1A', bandColor:'#C9A84C', num:42 },
  { id:11, marca:'Cohiba', nombre:'Cohiba 1966 L.E.',  cepo:52, longitud:166, tripa:'larga', fortaleza:0.70, cat:'limitadas', color:'#1a1a1a', bandColor:'#C9A84C', num:52 },
  { id:12, marca:'Romeo',  nombre:'Wide Churchill G.R',cepo:55, longitud:135, tripa:'larga', fortaleza:0.60, cat:'granreserva', color:'#4B0082', bandColor:'#C9A84C', num:55 },
];

// Articles content
const ARTICLES = {
  '1-0': {
    ch: 'Capítulo 1. Introducción',
    title: 'El Mejor Tabaco del Mundo',
    sub: '',
    body: `
      <p>En el mundo del tabaco existe una denominación de origen sin igual: el Habano. Producido exclusivamente en Cuba, este cigarro premium representa la cima de la artesanía tabacalera mundial, reconocido por los paladares más exigentes del planeta.</p>
      <p>Tres factores hacen al Habano irrepetible: el terruño cubano —especialmente la región de Vuelta Abajo en Pinar del Río—, el conocimiento ancestral de sus maestros torcedores y la hoja de tabaco negro cubano, la más aromática y compleja del mundo.</p>
      <p>Desde el siglo XVI, cuando los colonizadores españoles descubrieron el uso del tabaco por parte de los indígenas taínos, Cuba ha sido sinónimo de excelencia tabacalera. El paso de los siglos no ha hecho sino perfeccionar un proceso artesanal que hoy produce los cigarros más codiciados del globo.</p>
      <p>En 2026, el Habano sigue siendo el referente absoluto del tabaco premium. Las 33 marcas que componen el portafolio de Habanos S.A. ofrecen más de 500 vitolas distintas, cada una con su personalidad única, su blend característico y su ritual de disfrute particular.</p>
    `,
    pullQuote: 'El Habano: una referencia de perfección.',
    imgDesc: 'Hoja de tabaco cubano',
  },
  '2-1': {
    ch: 'Capítulo 2. Composición y origen del tabaco › Anatomía de un Habano',
    title: 'Anatomía de un Habano',
    sub: 'PARTES DEL HABANO',
    anatomy: true,
    body: `
      <p>Un habano se compone de tres partes fundamentales, cada una con un papel específico en la experiencia final del fumador. La armonía entre capa, capote y tripa determina el carácter único de cada vitola.</p>
    `,
  },
  '2-2': {
    ch: 'Capítulo 2. Composición y origen del tabaco › El Paraíso del Tabaco',
    title: 'El Paraíso del Tabaco',
    sub: 'CUBA Y SU TERROIR',
    body: `
      <p>Vuelta Abajo, en la provincia de Pinar del Río, es reconocida unánimemente como la mejor región tabacalera del mundo. Su suelo único —una mezcla de arcilla rojiza y arena que drena perfectamente sin perder la humedad necesaria— crea condiciones imposibles de replicar en ningún otro lugar.</p>
      <p>El microclima de la región, con sus temperaturas moderadas y la influencia de las brisas del Caribe, permite que las plantas de tabaco desarrollen aceites esenciales únicos que son la base del aroma y sabor inconfundible del Habano.</p>
      <p>Pero Vuelta Abajo no es la única región de excelencia. Semi Vuelta, Partido y Remedios también producen hojas de alta calidad, cada una con características propias que los maestros mezcladores combinan magistralmente para crear los blends característicos de cada marca.</p>
    `,
    imgDesc: 'Campos de tabaco en Vuelta Abajo',
  },
};

// =========================================
// NAVIGATION
// =========================================
function navigate(view, params = {}) {
  // Hide all views
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active-nav'));
  const activeLink = document.querySelector(`.nav-link[data-view="${view}"]`);
  if (activeLink) activeLink.classList.add('active-nav');

  const target = document.getElementById(`view-${view}`);
  if (!target) return;
  target.classList.add('active');
  state.currentView = view;

  // Special init
  if (view === 'vitolario') initVitolario();
  if (view === 'article') initArticle(params);
  if (view === 'agegate' || view === 'home') initHome(view);

  window.scrollTo(0, 0);
}

function initHome(view) {
  if (view === 'home') {
    const userIsLoggedIn = !!state.user;
    const loginBtn = document.querySelector('#view-home .btn-outline-cream');
    if (userIsLoggedIn && loginBtn) {
      loginBtn.textContent = 'Mi perfil';
      loginBtn.onclick = () => navigate('perfil');
    }
  }
}

// =========================================
// AGE GATE
// =========================================
function confirmAge() {
  sessionStorage.setItem('emh_age', '1');
  state.ageVerified = true;
  navigate('home');
}

// =========================================
// AUTH
// =========================================
function showRegStep2(isPropietario) {
  const step2 = document.getElementById('regStep2');
  const codLibro = document.getElementById('codLibro');
  step2.classList.remove('hidden');
  if (isPropietario) codLibro.classList.remove('hidden');
  else codLibro.classList.add('hidden');
}

function doRegister() {
  state.user = { type: 'propietario', email: 'habano1@gmail.com' };
  unlockNavForUser();
  navigate('home');
}

function doLogin() {
  state.user = { type: 'propietario', email: 'habano1@gmail.com' };
  unlockNavForUser();
  navigate('home');
}

function doLogout() {
  state.user = null;
  lockNav();
  navigate('home');
}

function unlockNavForUser() {
  document.getElementById('navIndice').classList.remove('locked');
  document.getElementById('navColeccionista').classList.remove('locked');
  document.getElementById('navIndice').disabled = false;
  document.getElementById('navColeccionista').disabled = false;
}

function lockNav() {
  document.getElementById('navIndice').classList.add('locked');
  document.getElementById('navColeccionista').classList.add('locked');
}

// =========================================
// VITOLARIO
// =========================================
let currentCat = 'regular';
let selectedVitola = VITOLAS[2]; // Cohiba Ambar default

function setCat(btn, cat) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentCat = cat;
  renderVitolas();
}

function initVitolario() {
  renderVitolas();
  renderVitolDetail(selectedVitola);
}

function renderVitolas() {
  const container = document.getElementById('vitolasVisual');
  const vitolas = VITOLAS.filter(v => v.cat === currentCat);
  container.innerHTML = '';
  vitolas.forEach(v => {
    const h = Math.round(80 + (v.longitud / 192) * 120);
    const w = Math.round(14 + (v.cepo / 60) * 20);
    const el = document.createElement('div');
    el.className = 'vitola-stick' + (v.id === selectedVitola.id ? ' selected' : '');
    el.onclick = () => { selectedVitola = v; renderVitolDetail(v); markSelected(v.id); };
    el.innerHTML = `
      <div class="stick-body" style="width:${w}px;height:${h}px;background:linear-gradient(to right,${v.color}99,${darken(v.color)},${v.color}99)">
        <div class="stick-band" style="background:linear-gradient(135deg,${v.bandColor} 0%,${darken(v.bandColor)} 50%,${v.bandColor} 100%)"></div>
      </div>
      <span class="stick-name">${v.nombre}</span>
    `;
    container.appendChild(el);
  });

  if (vitolas.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted);font-size:0.8rem;font-style:italic;padding:2rem 0">No hay vitolas en esta categoría.</p>';
  }
}

function darken(hex) {
  const n = parseInt(hex.replace('#',''), 16);
  const r = Math.max(0, ((n>>16)&0xFF) - 40);
  const g = Math.max(0, ((n>>8)&0xFF) - 40);
  const b = Math.max(0, (n&0xFF) - 40);
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}

function markSelected(id) {
  document.querySelectorAll('.vitola-stick').forEach(el => el.classList.remove('selected'));
  document.querySelectorAll('.vitola-stick').forEach((el, i) => {
    const vitolas = VITOLAS.filter(v => v.cat === currentCat);
    if (vitolas[i] && vitolas[i].id === id) el.classList.add('selected');
  });
}

function renderVitolDetail(v) {
  document.getElementById('detailMarca').textContent = `${v.marca} · ${catLabel(v.cat)}`;
  document.getElementById('detailNombre').textContent = v.nombre.toUpperCase();
  document.getElementById('detailBadge').textContent = v.cepo;
  document.getElementById('detailSpecs').innerHTML = `
    <tr><td>Vitola de galera:</td><td>${v.nombre}</td></tr>
    <tr><td>Formato:</td><td>—</td></tr>
    <tr><td>Cepo:</td><td>${v.cepo}</td></tr>
    <tr><td>Longitud:</td><td>${v.longitud} mm</td></tr>
    <tr><td>Calibre:</td><td>${v.cepo}</td></tr>
    <tr><td>Relleno:</td><td>${v.tripa}</td></tr>
  `;
  document.querySelector('.fortaleza-fill').style.width = `${v.fortaleza * 100}%`;

  const w = Math.round(40 + (v.cepo / 60) * 30);
  const img = document.getElementById('detailCigarImg');
  img.style.width = w + 'px';
  img.style.background = `linear-gradient(to right,${v.color}99,${darken(v.color)},${v.color}99)`;
}

function catLabel(cat) {
  return { regular:'Catálogo Regular', granreserva:'Gran Reserva', reserva:'Reserva', limitadas:'Ediciones Limitadas', anejados:'Añejados', vintage:'Habanos Vintage', especialistas:'Especialistas en Habanos' }[cat] || cat;
}

// =========================================
// ÍNDICE
// =========================================
function toggleChapter(btn) {
  btn.classList.toggle('open');
  const sub = btn.parentElement.querySelector('.sub-chapters');
  if (sub) sub.classList.toggle('hidden');
}

// =========================================
// ARTICLE READER
// =========================================
function initArticle(params) {
  const key = params.ch === 'nov' ? null : `${params.ch}-${params.sub || 0}`;
  const article = key ? ARTICLES[key] : null;

  const layout = document.getElementById('articleLayout');
  const crumb = document.getElementById('breadcrumbCh');

  if (!article) {
    crumb.textContent = 'Novedades';
    layout.innerHTML = `
      <div class="article-ch-label">Novedades 2026</div>
      <h1 class="article-h1">Últimas noticias del mundo del Habano</h1>
      <div class="article-body-grid">
        <div class="article-text">
          <p>Las grandes marcas de Habanos S.A. presentan sus lanzamientos más esperados de la temporada. Nuevas ediciones limitadas, añejados exclusivos y colecciones especiales que marcarán el año.</p>
          <p>Entre las novedades más destacadas: la nueva Edición Limitada Lancero de Juan López Selección, una vitola elegante y de gran longitud con un perfil aromático excepcional. También destaca el relanzamiento del Cohiba Vigorous, recuperando una vitola clásica con el blend característico de la marca líder.</p>
        </div>
        <div class="article-img-block"><div class="article-img-placeholder"></div></div>
      </div>
    `;
    return;
  }

  crumb.textContent = article.ch;
  document.getElementById('articleBreadcrumb').innerHTML = `
    <button onclick="navigate('indice')">Índice</button>
    <span>›</span>
    <span>${article.ch}</span>
  `;

  if (article.anatomy) {
    layout.innerHTML = `
      <div class="article-ch-label">${article.ch.split(' › ')[0]}</div>
      <h1 class="article-h1">${article.title}</h1>
      ${article.sub ? `<p class="article-sub">${article.sub}</p>` : ''}
      <div class="article-text">${article.body}</div>
      <div class="anatomy-diagram">
        <div class="anatomy-img-area">
          <svg viewBox="0 0 120 220" fill="none" width="80">
            <rect x="40" y="10" width="40" height="180" rx="20" fill="url(#cg)" opacity="0.9"/>
            <rect x="30" y="60" width="60" height="30" fill="#C9A84C" opacity="0.8"/>
            <defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#4A3010"/><stop offset="50%" stop-color="#8B6340"/><stop offset="100%" stop-color="#4A3010"/></linearGradient></defs>
          </svg>
        </div>
        <div class="anatomy-points">
          <div class="anatomy-point">
            <h5>La Capa</h5>
            <p>La capa es una hoja exquisitamente fina y elástica. Forma la superficie exterior del Habano. La capa representa la culminación de la perfección de un Habano y contribuye significativamente a su sabor y experiencia gustativa.</p>
          </div>
          <div class="anatomy-point">
            <h5>El Capote</h5>
            <p>Hoja que sostiene la tripa y da forma al cigarro antes de que la capa sea aplicada. De resistencia media, permite el enrollado artesanal.</p>
          </div>
          <div class="anatomy-point">
            <h5>La Tripa</h5>
            <p>La Tripa está formada por hojas como seco, ligero y volado. Es la combinación insustituible que da el sabor al Habano. La mezcla de hojas de distintos tiempos, su hojas de Relleno Tiempo, son trop de la magia.</p>
          </div>
        </div>
      </div>
      <div class="dark-anatomy-band">
        <div class="dark-anatomy-text">
          <h4>Partes del Habano</h4>
          <p>Cada hoja utilizada en la confección de los Habanos es cultivada en Cuba. Distintas zonas aportan cada tipo de tabaco en para sus usos específicos.</p>
          <p style="margin-top:1rem;font-size:0.7rem;color:var(--text-muted)">La Tripa — La Capa</p>
        </div>
        <div class="dark-anatomy-img">
          <svg viewBox="0 0 200 120" fill="none" width="160">
            <rect x="60" y="10" width="30" height="100" rx="15" fill="url(#hg)" opacity="0.9"/>
            <rect x="50" y="35" width="50" height="18" fill="#C9A84C" opacity="0.7"/>
            <text x="30" y="20" font-family="Lato" font-size="8" fill="#C9A84C" opacity="0.8">La Tripa</text>
            <line x1="50" y1="18" x2="65" y2="22" stroke="#C9A84C" stroke-width="0.8" opacity="0.6"/>
            <text x="105" y="50" font-family="Lato" font-size="8" fill="#C9A84C" opacity="0.8">La Capa</text>
            <line x1="104" y1="48" x2="92" y2="45" stroke="#C9A84C" stroke-width="0.8" opacity="0.6"/>
            <defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#4A3010"/><stop offset="50%" stop-color="#8B6340"/><stop offset="100%" stop-color="#4A3010"/></linearGradient></defs>
          </svg>
        </div>
      </div>
    `;
  } else {
    layout.innerHTML = `
      <div class="article-ch-label">${article.ch.split(' › ')[0] || ''}</div>
      <h1 class="article-h1">${article.title}</h1>
      ${article.sub ? `<p class="article-sub">${article.sub}</p>` : ''}
      <div class="article-body-grid">
        <div class="article-text">${article.body}</div>
        <div class="article-img-block"><div class="article-img-placeholder"></div></div>
      </div>
      ${article.pullQuote ? `<div class="article-pull-quote"><p>"${article.pullQuote}"</p></div>` : ''}
    `;
  }
}

// =========================================
// LANGUAGE
// =========================================
function setLang(lang) {
  state.lang = lang;
  document.getElementById('langEs').classList.toggle('active', lang === 'es');
  document.getElementById('langEn').classList.toggle('active', lang === 'en');
  document.documentElement.lang = lang;
}

// =========================================
// MOBILE NAV
// =========================================
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('mobile-open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('mobile-open');
  });
});

// =========================================
// INIT
// =========================================
window.addEventListener('DOMContentLoaded', () => {
  if (!state.ageVerified) {
    navigate('agegate');
  } else {
    navigate('home');
  }
});

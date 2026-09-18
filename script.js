// =========================================
// EL MUNDO DEL HABANO — SPA
// =========================================

const state = {
  ageVerified: sessionStorage.getItem('emh_age') === '1',
  user: null,
  lang: 'es',
  currentView: null,
};

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

const ARTICLES = {
  '1-0': {
    ch: 'Capítulo 1. Introducción',
    title: 'El Mejor Tabaco del Mundo',
    body: `<p>En el mundo del tabaco existe una denominación de origen sin igual: el Habano. Producido exclusivamente en Cuba, este cigarro premium representa la cima de la artesanía tabacalera mundial, reconocido por los paladares más exigentes del planeta.</p>
      <p>Fue en Cuba, durante el primer viaje de Cristóbal Colón en 1492, donde se vio por primera vez el tabaco en el Nuevo Mundo. Los aborígenes del grupo taínos enrollaban y encendían unas hojas misteriosas llamadas "Cohiba". Desde ese puerto de partida, el tabaco ha sido comerciado y plantado por todo el mundo. Sin embargo, desde su existencia, el tabaco negro cubano fue considerado el mejor a nivel internacional.</p>
      <p>Las condiciones únicas de la tierra de Cuba, suelos, clima, la variedad de tabaco negro cubano y el saber hacer de los vegueros y torcedores dedícados a su cultivo han contribuido a mantener su distinción más de cinco siglos después.</p>
      <p>La esencia de esta diferencia está en el tabaco y su sabor, a partir de la unión de cuatro factores sólo existentes en Cuba: suelos, clima, la variedad de tabaco negro cubano y el saber hacer de los vegueros y torcedores. Es por ello que, aunque en otros lugares se puedan haber adquirido ciertas técnicas agrícolas cubanas e incluso las semillas autóctonas, jamás se podrá replicar la naturaleza única del suelo y el clima de Cuba.</p>
      <p>El título "Habanos" es la Denominación de Origen Protegida (D.O.P) reservada para una selección de las más prominentes marcas cuyos tabacos se confeccionan, siguiendo las normas más rigurosas, a partir de hojas de tabaco cosechadas en zonas determinadas también protegidas como denominaciones de origen.</p>
      <p>Los Habanos se elaboran "Totalmente a Mano", aplicando métodos cubanos que se utilizaron por primera vez en La Habana hace más de dos siglos, que se transmiten de generación en generación y que se han mantenido casi invariables.</p>`,
    pullQuote: 'El Habano: una referencia de perfección.',
  },
  '2-1': {
    ch: 'Capítulo 2. Composición y origen del tabaco',
    title: 'Anatomía de un Habano',
    sub: 'PARTES DEL HABANO',
    anatomy: true,
    body: `<p>Se necesitan hasta seis tipos de hojas de tabaco para confeccionar un Habano, cada tipo especialmente cultivado y preparado con este fin: Volado, Seco, Ligero, Capote, Capa y Medio Tiempo.</p>
      <p><strong>La Capa</strong> — Hoja exquisitamente fina y elástica. Forma la superficie exterior del Habano. La capa representa la culminación de la perfección de un Habano y contribuye significativamente a su sabor, aroma y combustibilidad.</p>
      <p><strong>El Capote</strong> — La hoja especial que envuelve las hojas que forman la tripa, define la forma del Habano y da un toque final a su calidad a la hora de fumarlo.</p>
      <p><strong>La Tripa</strong> — Está formada por 3 hojas como mínimo (Volado, Seco y Ligero). De su combinación resulta la ligada que distingue el sabor y fortaleza de un Habano. La Línea Belike, adicionalmente a estas hojas, incluye la rara hoja de Medio Tiempo, una hoja mágica.</p>`,
  },
  '2-2': {
    ch: 'Capítulo 2. Composición y origen del tabaco',
    title: 'El Paraíso del Tabaco',
    sub: 'CUBA Y SU TERROIR',
    body: `<p>En ningún otro lugar del mundo se cultiva un tabaco mejor que el de Cuba. Pero incluso aquí, sólo algunas tierras, o vegas, se consideran aptas para cultivar el tabaco con que se confecciona un Habano.</p>
      <p>Así como a un buen vino lo define su viñedo, el carácter de un Habano está íntimamente relacionado con el suelo donde se cultiva el tabaco. La "Selección" es el principio que rige cada una de las etapas en el proceso de producción de cada hoja de tabaco para el Habano. Es justo aquí donde esa selección comienza.</p>
      <p>Los lugares donde se puede cultivar el tabaco para la confección de un Habano están estrictamente limitados a ciertas regiones, zonas y distritos tabacaleros bien definidos del territorio de Cuba. En estas regiones existe sólo un pequeño grupo de tierras que poseen su propio estilo especial de cultivo.</p>
      <p>Estas son las Vegas de Primera, cuyas características las convierten en superiores a las demás gracias a la excepcional calidad de su suelo, su microclima, así como las sorprendentes habilidades desarrolladas a la hora de cultivarlas.</p>
      <p>Son tan especiales estas regiones, zonas y distritos tabacaleros que están amparados por Denominaciones de Origen Protegidas (D.O.P.). Los encontrará marcados por un asterisco (*) en el texto. Tales zonas protegidas son: Semi Vuelta, Vuelta Abajo, Remedios, Vuelta Arriba y La Habana.</p>`,
  },
  'nov-1': {
    ch: 'Novedades',
    title: 'JUAN LOPEZ SELECCIÓN',
    sub: 'Lanzamiento (solo en Cuba)',
    body: `<p>Juan López ha lanzado una nueva selección exclusiva disponible únicamente en Cuba. Esta edición especial combina las mejores hojas de la cosecha 2024 con técnicas tradicionales de torcido.</p>
      <p>La vitola seleccionada destaca por su equilibrio de sabores y su aroma inconfundible, resultado de un cuidadoso proceso de añejamiento.</p>`,
  },
  'nov-2': {
    ch: 'Novedades',
    title: 'JUAN LOPEZ SELECCIÓN',
    sub: 'Actualización del Vitolario',
    body: `<p>Se ha actualizado el catálogo de vitolas de Juan López con nuevos formatos y especificaciones. El vitolario ahora incluye datos técnicos más precisos y clasificación mejorada.</p>
      <p>Estas actualizaciones reflejan los cambios en la producción y disponibilidad de los formatos tradicionales.</p>`,
  },
  'nov-3': {
    ch: 'Novedades',
    title: 'COHIBA VISTOSOS',
    sub: 'Lanzamiento (Cannes)',
    body: `<p>Cohiba ha presentado su nueva línea Vistosos en el evento de Cannes, una edición limitada que celebra la excelencia del habano a nivel mundial.</p>
      <p>Estos habanos están diseñados para los aficionados más exigentes, combinando carácter robusto con elegancia en su presentación.</p>`,
  },
};

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
    img.style.cssText = `width:${Math.round(v.cepo * 0.42)}px;min-height:${heightPx}px;background:linear-gradient(to right,${v.color},${lighten(v.color)},${v.color});border-radius:${Math.round(v.cepo*0.21)}px ${Math.round(v.cepo*0.21)}px 4px 4px;box-shadow:-4px 0 8px rgba(0,0,0,0.5);`;
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

function toggleChapter(btn) {
  const item = btn.closest('.ch-item');
  const sub = item.querySelector('.sub-ch');
  const leer = btn.querySelector('.ch-leer');
  const isOpen = btn.classList.contains('open');
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

function showRegStep2(hasBook) {
  const step2 = document.getElementById('regStep2');
  if (!step2) return;
  if (hasBook) { step2.classList.remove('hidden'); }
  else { step2.classList.add('hidden'); }
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
  document.querySelectorAll('.nav-locked').forEach(b => b.classList.remove('nav-locked'));
}

function lockNav() {
  const navIndice = document.getElementById('navIndice');
  const navCol = document.getElementById('navColeccionista');
  if (navIndice) navIndice.classList.add('nav-locked');
  if (navCol) navCol.classList.add('nav-locked');
}

function setLang(lang) {
  state.lang = lang;
  document.getElementById('langEs').classList.toggle('active', lang === 'es');
  document.getElementById('langEn').classList.toggle('active', lang === 'en');
}

document.addEventListener('DOMContentLoaded', () => {
  if (state.ageVerified) { navigate('home'); }
  else { navigate('agegate'); }
  console.log('El Mundo del Habano - Versión 2026');
});

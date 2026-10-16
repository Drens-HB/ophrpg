const pages = [
  { file: "1.png", title: "AMAZON LILY", caption: "El hogar que la vio crecer." },
  { file: "2.png", title: "LA MENTORA", caption: "Una guerrera que le enseñó a encontrar su propio rumbo." },
  { file: "3.png", title: "LA PARTIDA DE SUIREN", caption: "Una promesa. Una espera. Una noticia imposible de aceptar." },
  { file: "4.png", title: "LA EXPULSIÓN", caption: "Yoru deja atrás el único hogar que había conocido." },
  { file: "5.png", title: "TUMI", caption: "El mar le arrebató el rumbo; una isla desconocida le dio otra oportunidad." },
  { file: "6s.png", title: "LOS MERCENARIOS", caption: "Sobrevivir fue el primer trabajo. Confiar, algo más difícil." },
  { file: "7.png", title: "YORU PIRATES", caption: "Una bandera, una tripulación y un horizonte por conquistar." }
];

const image = document.getElementById("manga-page");
const currentPage = document.getElementById("current-page");
const totalPages = document.getElementById("total-pages");
const chapter = document.getElementById("page-chapter");
const caption = document.getElementById("page-caption");
const progress = document.getElementById("progress-bar");
const prev = document.getElementById("prev-page");
const next = document.getElementById("next-page");
const prevLabel = document.getElementById("prev-label");
const nextLabel = document.getElementById("next-label");
const thumbs = document.getElementById("thumbnail-grid");
const toggleThumbs = document.getElementById("toggle-thumbnails");
const stage = document.getElementById("page-stage");
let active = 0;
let touchStartX = null;

totalPages.textContent = String(pages.length).padStart(2, "0");

function renderThumbnails() {
  thumbs.innerHTML = "";
  pages.forEach((page, index) => {
    const button = document.createElement("button");
    button.className = "thumb";
    button.type = "button";
    button.setAttribute("aria-current", index === active ? "true" : "false");
    button.innerHTML = `<img src="assets/pages/${page.file}" alt="" loading="lazy"><span>${String(index + 1).padStart(2, "0")} · ${page.title}</span>`;
    button.addEventListener("click", () => {
      showPage(index);
      document.getElementById("lector").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    thumbs.appendChild(button);
  });
}

function showPage(index) {
  active = Math.max(0, Math.min(pages.length - 1, index));
  const page = pages[active];
  image.classList.add("is-changing");
  const nextSrc = `assets/pages/${page.file}`;
  const preload = new Image();
  preload.onload = () => {
    image.src = nextSrc;
    image.alt = `Página ${active + 1} de ${pages.length}: ${page.title}`;
    image.classList.remove("is-changing");
  };
  preload.onerror = () => {
    image.src = nextSrc;
    image.classList.remove("is-changing");
  };
  preload.src = nextSrc;
  currentPage.textContent = String(active + 1).padStart(2, "0");
  chapter.textContent = page.title;
  caption.textContent = page.caption;
  progress.style.width = `${((active + 1) / pages.length) * 100}%`;
  prev.disabled = prevLabel.disabled = active === 0;
  next.disabled = nextLabel.disabled = active === pages.length - 1;
  [...thumbs.children].forEach((el, i) => el.setAttribute("aria-current", i === active ? "true" : "false"));
}

prev.addEventListener("click", () => showPage(active - 1));
next.addEventListener("click", () => showPage(active + 1));
prevLabel.addEventListener("click", () => showPage(active - 1));
nextLabel.addEventListener("click", () => showPage(active + 1));

document.getElementById("begin-reading").addEventListener("click", () => {
  document.getElementById("lector").scrollIntoView({ behavior: "smooth", block: "start" });
});

toggleThumbs.addEventListener("click", () => {
  const open = thumbs.hidden;
  thumbs.hidden = !open;
  toggleThumbs.setAttribute("aria-expanded", String(open));
  toggleThumbs.innerHTML = open ? 'Ocultar páginas <span>−</span>' : 'Ver todas las páginas <span>＋</span>';
});

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === "ArrowLeft") showPage(active - 1);
  if (event.key === "ArrowRight") showPage(active + 1);
});

stage.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });
stage.addEventListener("touchend", (event) => {
  if (touchStartX === null) return;
  const delta = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(delta) > 55) showPage(active + (delta < 0 ? 1 : -1));
  touchStartX = null;
}, { passive: true });

renderThumbnails();
showPage(0);

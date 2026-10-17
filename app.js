const script = document.currentScript;
const pagesFolder = script.dataset.pages;

const pages = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
];

function path(i) {
  return `${pagesFolder}${pages[i]}`;
}

const cover = document.getElementById("cover");
const openBookButton = document.getElementById("open-book");
const book = document.getElementById("book");
const controls = document.getElementById("controls");
const currentImage = document.getElementById("current-image");
const under = document.getElementById("page-under");
const leaf = document.getElementById("flip-leaf");
const flipImage = document.getElementById("flip-image");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const pageNumber = document.getElementById("page-number");
let index = 0;
let busy = false;
let opened = false;
const duration = 620;

function path(i) { return `assets/pages/${pages[i]}`; }
function preload(i) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = path(i);
  });
}
function updateControls() {
  prevButton.disabled = index === 0 || busy;
  nextButton.disabled = index === pages.length - 1 || busy;
  pageNumber.textContent = `${String(index + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}`;
  currentImage.alt = `Página ${index + 1}`;
}
function openBook() {
  if (opened) return;
  opened = true;
  cover.hidden = true;
  book.hidden = false;
  controls.hidden = false;
  currentImage.src = path(0);
  updateControls();
}
async function turn(direction) {
  if (!opened || busy) return;
  const target = index + direction;
  if (target < 0 || target >= pages.length) return;
  busy = true;
  updateControls();
  await preload(target);

  const oldSrc = path(index);
  const newSrc = path(target);
  under.style.background = `#100d0b url("${newSrc}") center / 100% 100% no-repeat`;
  flipImage.src = oldSrc;
  leaf.style.transformOrigin = direction > 0 ? "left center" : "right center";
  leaf.className = `page flip-leaf turning ${direction > 0 ? "forward" : "backward"}`;

  currentImage.src = newSrc;
  window.setTimeout(() => {
    index = target;
    leaf.className = "page flip-leaf";
    leaf.style.transform = "";
    under.style.background = "";
    currentImage.src = path(index);
    busy = false;
    updateControls();
  }, duration + 30);
}
openBookButton.addEventListener("click", openBook);
nextButton.addEventListener("click", () => turn(1));
prevButton.addEventListener("click", () => turn(-1));
document.addEventListener("keydown", event => {
  if (event.altKey || event.ctrlKey || event.metaKey || !opened) return;
  if (event.key === "ArrowRight") turn(1);
  if (event.key === "ArrowLeft") turn(-1);
});
let touchStartX = null;
book.addEventListener("touchstart", event => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
book.addEventListener("touchend", event => {
  if (touchStartX === null) return;
  const delta = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) > 60) turn(delta < 0 ? 1 : -1);
  touchStartX = null;
}, { passive: true });
updateControls();

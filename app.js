const pages = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
];

const currentImage = document.getElementById("current-image");
const under = document.getElementById("page-under");
const leaf = document.getElementById("flip-leaf");
const flipImage = document.getElementById("flip-image");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
let index = 0;
let busy = false;
const duration = 620;

function imagePath(i) {
  return `assets/pages/${pages[i]}`;
}
function preload(i) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = imagePath(i);
  });
}
function updateButtons() {
  prevButton.disabled = index === 0 || busy;
  nextButton.disabled = index === pages.length - 1 || busy;
  currentImage.alt = `Página ${index + 1}`;
}
async function turn(direction) {
  if (busy) return;
  const target = index + direction;
  if (target < 0 || target >= pages.length) return;
  busy = true;
  updateButtons();

  await preload(target);
  const oldSrc = imagePath(index);
  const newSrc = imagePath(target);

  // The incoming page is visible underneath; the current page becomes the turning leaf.
  under.style.backgroundImage = `url("${newSrc}")`;
  under.style.backgroundSize = "100% 100%";
  under.style.backgroundPosition = "center";
  under.style.backgroundRepeat = "no-repeat";
  flipImage.src = oldSrc;
  leaf.className = `page flip-leaf turning ${direction > 0 ? "forward" : "backward"}`;

  // Set the new page below the turning leaf, then animate the old sheet away.
  currentImage.src = newSrc;
  if (direction < 0) {
    // For a backward turn, mirror the motion so the sheet returns from the right.
    leaf.style.transformOrigin = "right center";
  } else {
    leaf.style.transformOrigin = "left center";
  }

  window.setTimeout(() => {
    index = target;
    leaf.className = "page flip-leaf";
    leaf.style.transform = "";
    under.style.backgroundImage = "";
    currentImage.src = imagePath(index);
    busy = false;
    updateButtons();
  }, duration + 25);
}

nextButton.addEventListener("click", () => turn(1));
prevButton.addEventListener("click", () => turn(-1));
document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === "ArrowRight") turn(1);
  if (event.key === "ArrowLeft") turn(-1);
});

let touchStartX = null;
document.getElementById("book").addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });
document.getElementById("book").addEventListener("touchend", (event) => {
  if (touchStartX === null) return;
  const delta = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) > 60) turn(delta < 0 ? 1 : -1);
  touchStartX = null;
}, { passive: true });

updateButtons();

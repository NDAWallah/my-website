// NDA Wallah Website - Basic Functions

// Fallback lists: sirf tab dikhengi jab Firebase set up nahi hai.
const BATCHES = [];
const BOOKS = [];
const SOCIAL = [];

const SDK = "https://www.gstatic.com/firebasejs/10.12.2/";

function loadScript(src) {
  return new Promise(function (resolve, reject) {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function firebaseReady() {
  const c = window.FIREBASE_CONFIG;
  return !!(c && c.apiKey && !/^PASTE/.test(c.apiKey));
}

// Reads one collection (batches / books / social) from Firestore, newest first.
async function fetchItems(col, fallback) {
  try {
    await loadScript("firebase-config.js");
    if (!firebaseReady()) return fallback;
    await loadScript(SDK + "firebase-app-compat.js");
    await loadScript(SDK + "firebase-firestore-compat.js");
    if (!firebase.apps.length) firebase.initializeApp(window.FIREBASE_CONFIG);
    const snap = await firebase.firestore().collection(col).orderBy("created", "desc").get();
    return snap.docs.map(function (d) { return d.data(); });
  } catch (err) {
    console.error("Could not load " + col, err);
    return fallback;
  }
}

function renderCards(items, listId, emptyId) {
  const list = document.getElementById(listId);
  const empty = document.getElementById(emptyId);
  if (!list) return;

  list.innerHTML = "";
  items.forEach(function (item) {
    const card = document.createElement("div");
    const name = item.title || item.name || "";

    if (item.image) {
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = name;
      img.loading = "lazy";
      card.appendChild(img);
    }

    const title = document.createElement("h3");
    title.textContent = name;
    card.appendChild(title);

    if (item.description) {
      const desc = document.createElement("p");
      desc.textContent = item.description;
      card.appendChild(desc);
    }

    if (item.link && /^https?:\/\//i.test(item.link)) {
      const btn = document.createElement("a");
      btn.href = item.link;
      btn.textContent = item.linkText || "Open";
      btn.target = "_blank";
      btn.rel = "noopener";
      card.appendChild(btn);
    }

    list.appendChild(card);
  });

  if (empty) {
    empty.style.display = items.length ? "none" : "";
  }
}

function loadList(col, listId, emptyId, fallback) {
  const list = document.getElementById(listId);
  if (!list) return;
  const empty = document.getElementById(emptyId);
  if (empty) empty.style.display = "none"; // avoid a flash of "No items yet" while loading
  fetchItems(col, fallback).then(function (items) {
    renderCards(items, listId, emptyId);
  });
}


// 3-line menu button + side drawer. Add or remove menu items in the list below.
function buildMenu() {
  const header = document.querySelector(".top, .topbar");
  if (!header) return;

  const items = [
    ["🏠", "Home", "index.html"],
    ["🎖️", "Batches", "batches.html"],
    ["📚", "Books", "books.html"],
    ["💬", "Connect with us", "social.html"]
  ];
  const page = location.pathname.split("/").pop() || "index.html";
  const logo = header.querySelector(".brand img");

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "menu-btn";
  btn.setAttribute("aria-label", "Open menu");
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-controls", "sideMenu");
  btn.innerHTML = "<span></span><span></span><span></span>";

  const backdrop = document.createElement("div");
  backdrop.className = "menu-backdrop";

  const menu = document.createElement("aside");
  menu.id = "sideMenu";
  menu.className = "side-menu";
  menu.setAttribute("aria-label", "Menu");

  const head = document.createElement("div");
  head.className = "sm-head";
  if (logo) {
    const img = document.createElement("img");
    img.src = logo.getAttribute("src");
    img.alt = "";
    img.onerror = function () { img.style.display = "none"; };
    head.appendChild(img);
  }
  const name = document.createElement("b");
  name.textContent = "NDA Wallah";
  head.appendChild(name);
  const close = document.createElement("button");
  close.type = "button";
  close.className = "sm-close";
  close.setAttribute("aria-label", "Close menu");
  close.textContent = "✕";
  head.appendChild(close);
  menu.appendChild(head);

  items.forEach(function (it) {
    const a = document.createElement("a");
    a.href = it[2];
    if (it[2] === page) a.setAttribute("aria-current", "page");
    const ic = document.createElement("span");
    ic.setAttribute("aria-hidden", "true");
    ic.textContent = it[0];
    a.appendChild(ic);
    a.appendChild(document.createTextNode(it[1]));
    menu.appendChild(a);
  });

  function setOpen(open) {
    document.body.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    (open ? close : btn).focus();
  }
  btn.addEventListener("click", function () { setOpen(true); });
  close.addEventListener("click", function () { setOpen(false); });
  backdrop.addEventListener("click", function () { setOpen(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) setOpen(false);
  });

  header.appendChild(btn);
  document.body.appendChild(backdrop);
  document.body.appendChild(menu);
}

document.addEventListener("DOMContentLoaded", function () {

  buildMenu();

  // Page loading effect
  document.body.classList.add("loaded");

  // Batches, books and social pages
  loadList("batches", "batchList", "batchEmpty", BATCHES);
  loadList("books", "bookList", "bookEmpty", BOOKS);
  loadList("social", "socialList", "socialEmpty", SOCIAL);

  // Smooth link handling
  const links = document.querySelectorAll("a");
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      const href = link.getAttribute("href");
      if (href && href !== "#" && !href.startsWith("http")) {
        document.body.classList.remove("loaded");
      }
    });
  });

  // Admin button
  const adminButtons = document.querySelectorAll(".admin-btn");
  adminButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      window.location.href = "admin.html";
    });
  });

  // Current year in footer
  const year = document.querySelector("#year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});

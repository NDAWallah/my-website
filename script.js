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

document.addEventListener("DOMContentLoaded", function () {

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

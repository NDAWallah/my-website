// NDA Wallah Website - Basic Functions

// ====== YAHAN APNE BATCHES AUR BOOKS ADD KARO ======
// Har item ke beech comma lagana. Neeche ka example copy karke apna likho.
// link aur linkText optional hain (na do to button nahi dikhega).
const BATCHES = [
  // { title: "NDA 2027 Batch", description: "Maths + GAT ki live classes", link: "https://t.me/yourchannel", linkText: "Join batch" },
];

const BOOKS = [
  // { title: "NDA Maths Notes", description: "Free PDF notes", link: "https://example.com/notes.pdf", linkText: "Open PDF" },
];
// ===================================================

function renderCards(items, listId, emptyId) {
  const list = document.getElementById(listId);
  const empty = document.getElementById(emptyId);
  if (!list) return;

  list.innerHTML = "";
  items.forEach(function (item) {
    const card = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = item.title || "";
    card.appendChild(title);

    if (item.description) {
      const desc = document.createElement("p");
      desc.textContent = item.description;
      card.appendChild(desc);
    }

    if (item.link) {
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

document.addEventListener("DOMContentLoaded", function () {

  // Page loading effect
  document.body.classList.add("loaded");

  // Batches and books pages
  renderCards(BATCHES, "batchList", "batchEmpty");
  renderCards(BOOKS, "bookList", "bookEmpty");

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

  // Admin button protection for prototype
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

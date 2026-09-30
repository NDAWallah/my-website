# NDA Wallah

A study platform for NDA aspirants. Explore batches, books and study resources in one place.

**Live site:** https://ndawallah.github.io/

## Pages

| Page | What it shows |
|---|---|
| `index.html` | Home page with links to everything |
| `batches.html` | Study batches |
| `books.html` | Books and study material |
| `social.html` | Telegram, WhatsApp and other social links |
| `admin.html` | Admin login to add, edit and delete batches, books and social links |

## How content is managed

Batches, books and social links are stored in Firebase (Firestore) and shown on the site automatically.
The owner signs in on `admin.html` with an email and password. Only the owner's email is allowed to write data (set in the Firestore rules); everyone else can only read.

## Project files

```
index.html         home
batches.html       batches
books.html         books
social.html        social links
admin.html         admin panel (login, add, edit, delete)
script.js          loads data, side menu, glass bottom bar
style.css          shared styles
firebase-config.js Firebase project details
logo.png           logo
```

## Hosting

Hosted with GitHub Pages from the `main` branch. Any commit to `main` updates the live site.
If the site address changes, add the new address in Firebase > Authentication > Settings > Authorized domains, or admin login will stop working.

© 2026 NDA Wallah

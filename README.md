# NDA Wallah

A study platform for NDA aspirants. Explore batches, books and study resources in one place.

**Live site:** https://paruldhaka301008-create.github.io/my-website/

## Pages

| Page | What it shows |
|---|---|
| `index.html` | Home page with links to everything |
| `batches.html` | Study batches |
| `books.html` | Books and study material |
| `social.html` | Telegram, WhatsApp and other social links |
| `admin.html` | Helper that builds ready-to-paste lines for new batches and books |

## Add a batch or a book

1. Open `admin.html` on the site and fill in the form.
2. Copy the line it creates.
3. Open `script.js` and paste the line inside the `BATCHES` or `BOOKS` list.
4. Commit the change. The new item shows up on the site after a minute or two.

An entry looks like this:

```js
{ title: "NDA 2027 Batch", description: "Maths + GAT live classes", link: "https://t.me/yourchannel", linkText: "Join batch" },
```

`link` and `linkText` are optional.

## Project files

```
index.html     home
batches.html   batches
books.html     books
social.html    social links
admin.html     line builder for batches and books
script.js      batch and book lists, page behaviour
style.css      shared styles (used by pages that link it)
logo.png       logo
```

## Hosting

The site is hosted with GitHub Pages from the `main` branch. Any commit to `main` updates the live site.

## Status

The admin page is a helper only. It has no login and cannot change the site by itself. A real admin with sign-in and a database is planned for a later phase.

© 2026 NDA Wallah

# NovaNotes 📝

> Capture your thoughts beautifully.

NovaNotes is a clean, minimal note-taking web app built with vanilla HTML, CSS, and JavaScript. Create, search, color-tag, and delete notes — all persisted locally in your browser. No frameworks, no backend, no dependencies.

## Features

- ✍️ **Create notes** with a title and body
- 🎨 **Color tagging** — choose from 5 pastel colors to organize notes visually
- 🔍 **Live search** — instantly filter notes by title or body content
- 🗑️ **Delete notes** with a single click
- 💾 **Persistent storage** — notes are saved in the browser via `localStorage`, so they stay after refresh
- 📱 **Responsive design** — adapts from mobile to desktop with a CSS Grid layout
- 🕳️ **Smart empty states** — different messages for "no notes yet" vs "no search results"

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, CSS Grid, smooth transitions
- **JavaScript (ES6+)** — vanilla, no libraries
- **Web Storage API** — `localStorage` for persistence
- **Google Fonts** — [Outfit](https://fonts.google.com/specimen/Outfit)

## Project Structure

```
NovaNotes/
├── index.html    # Markup and structure
├── style.css     # Design system and styling
└── script.js     # App logic and state management
```

## Getting Started

No build tools or installation required.

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/NovaNotes.git
   ```
2. Open `index.html` in your browser

That's it — the app runs entirely client-side.

## How It Works

- Notes are stored as an array of objects in memory and synced to `localStorage` under the key `nova_notes` on every change.
- The DOM is rebuilt safely using `textContent` (not `innerHTML`) for user-entered data, preventing HTML/script injection.
- Search filters notes in real time by matching the query against both the title and body (case-insensitive).

## Known Limitations

- Notes are stored only in the browser's `localStorage` — they won't sync across devices or persist if browser storage is cleared.
- No edit functionality yet — notes can only be added or deleted.

## Roadmap Ideas

- [ ] Edit existing notes
- [ ] Pin/favorite notes
- [ ] Export notes as text/JSON
- [ ] Dark mode

## License

This project is licensed under the MIT License.

---

Made with 🩶 by Muqaddas_Ali

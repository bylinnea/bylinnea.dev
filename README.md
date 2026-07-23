# bylinnea.dev

Portfolio site for [bylinnea.dev](https://bylinnea.dev) — if you're curious about how something is built, feel free to look around.

Built from scratch with HTML, CSS and vanilla JavaScript.

## Structure

```
├── index.html          # Single-page entry point
├── css/
│   └── style.css       # All styles
├── js/
│   ├── script.js       # Hamburger menu + scroll-spy
│   └── writing.js      # Fetches latest Substack posts (via rss2json)
└── assets/
    ├── images/
    │   └── linnea.jpg  # Profile photo
    └── linnea-cv.pdf   # CV download
```

## Features

- Scroll-snap single-page layout (About → Projects → Writing → Contact)
- Live "recent posts" list pulled from the Substack RSS feed via [rss2json](https://rss2json.com)
- Section indicator dots with click navigation
- Scroll-spy that updates the active nav link as you scroll
- Responsive, collapses to a hamburger menu on mobile
- CV download

## Built with

- [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) - code font
- [Syne](https://fonts.google.com/specimen/Syne) - display headings
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) - body text
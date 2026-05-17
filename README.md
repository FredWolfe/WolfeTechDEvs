# WolfeTech Devs — Portfolio Website

**Wolfe Awotwi** | Aspiring Data Engineer & Software Developer  
Built as part of the ALX Africa Program — Week 12 Milestone

---

## 📁 Folder Structure

```
wolfetech-portfolio/
│
├── index.html          ← Main HTML file (all page sections live here)
│
├── css/
│   └── style.css       ← All styling (colours, layout, fonts, animations)
│
├── js/
│   └── main.js         ← All interactivity (scroll effects, typing animation)
│
└── assets/
    ├── wallpaper.jpg       ← Hero background image
    ├── rosa.jpeg           ← Profile photo (About section)
    ├── show.jpeg           ← Gallery photo 1
    ├── showcase.jpeg       ← Gallery photo 2
    └── showcase_video.mp4  ← Gallery video
```

---

## 🛠️ How to Edit in VS Code

1. Open the **entire folder** in VS Code (`File → Open Folder`)
2. Edit **index.html** to change text, add/remove sections
3. Edit **css/style.css** to change colours, fonts, spacing
4. Edit **js/main.js** to change animations and interactions
5. Preview with the **Live Server** extension (right-click index.html → Open with Live Server)

### Key things to customise:
- **Colours** → top of `style.css`, change the `:root` variables
- **Your name / bio** → `index.html`, About section
- **Projects** → `index.html`, Portfolio section (swap iframe URLs)
- **Social links** → `index.html`, Contact section (swap href values)
- **Profile photo** → replace `assets/rosa.jpeg` with a new photo (keep same filename)

---

## 🚀 How to Deploy on GitHub Pages (Free Hosting)

1. Create a free account at [github.com](https://github.com)
2. Click **New Repository** → name it `wolfetech-portfolio`
3. Upload **all files and folders** (drag & drop)
4. Go to **Settings → Pages → Source → main branch → / (root)**
5. Your live site URL will be: `https://yourusername.github.io/wolfetech-portfolio`

---

## 🎨 Design System

| Token | Value | Used for |
|-------|-------|----------|
| `--primary` | `#00d4ff` | Cyan highlights, links |
| `--accent` | `#7b2fff` | Purple accents, badges |
| `--gold` | `#f0c040` | Section labels, quotes |
| `--bg` | `#050a14` | Dark page background |
| `--muted` | `#7a9bb5` | Subdued text |

Fonts: **Orbitron** (headings) · **Rajdhani** (body) · **Space Mono** (labels/code)

# WolfeTech Devs — Portfolio Website

**Wolfe Awotwi** | Aspiring Data Engineer & Software Developer  
Built as part of the ALX Africa Professional Foundation Program — Week 12 Milestone

---

## 📁 Folder Structure

```bash
WolfeTechDEvs/
├── index.html               ← All page sections
├── css/
│   └── style.css            ← All styling + v2 additions
├── js/
│   └── main.js              ← All interactivity (carousel, lightbox, scroll)
├── assets/
│   ├── wallpaper.jpg        ← Hero background
│   ├── wolfe_suit.jpeg      ← NEW: suit photo (carousel slide 1)
│   ├── rosa.jpeg            ← Original photo (carousel slide 2)
│   ├── show.jpeg            ← Showcase gallery
│   ├── showcase.jpeg        ← Showcase gallery
│   └── showcase_video.mp4   ← Showcase gallery video
└── settings.json            ← VS Code spell-check settings
```

---

## ✅ v2 Changes Summary

| Feature        | What changed                                                    |
| -------------- | --------------------------------------------------------------- |
| About photo    | Now a 2-slide carousel (suit photo first, rosa second, 5s auto) |
| Skills heading | New `// My Skills` heading — primary colour, no underline       |
| Showcase       | Now its own section with nav link                               |
| Gallery images | Full natural dimensions, no forced cropping                     |
| Gallery click  | Opens full lightbox with prev/next and keyboard navigation      |
| Elevator Pitch | New section (after About) — Loom video placeholder              |
| Navigation     | Added Showcase link                                             |

---

## 🎬 How to Add Your Loom Video

1. Go to your Loom video → Share → Embed
2. Copy the embed URL (looks like `https://www.loom.com/embed/abc123`)
3. Open `index.html` in VS Code
4. Find the `#pitch` section
5. Uncomment the `<iframe>` block and paste your URL
6. Delete the `<div class="pitch-placeholder">` block above it

---

---

## 🛠️ How to Edit in VS Code

1. Open the **entire folder** in VS Code (`File → Open Folder`)
2. Edit **index.html** to change text, add/remove sections
3. Edit **css/style.css** to change colours, fonts, spacing
4. Edit **js/main.js** to change animations and interactions
5. Install **Live Server** extension
6. Preview with the **Live Server** extension (right-click index.html → Open with Live Server)

### Key things to customize

- **Colors** → top of `style.css`, change the `:root` variables
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

| Token       | Value     | Used for               |
| ----------- | --------- | ---------------------- |
| `--primary` | `#00d4ff` | Cyan highlights, links |
| `--accent`  | `#7b2fff` | Purple accents, badges |
| `--gold`    | `#f0c040` | Section labels, quotes |
| `--bg`      | `#050a14` | Dark page background   |
| `--muted`   | `#7a9bb5` | Subdued text           |

Fonts: **Orbitron** (headings) · **Rajdhani** (body) · **Space Mono** (labels/code)

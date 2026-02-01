# MS Paint Clone – React + JSX Edition

A loving, pixel-perfect recreation of the classic **Windows 98 / XP Microsoft Paint** built entirely with **React** and **JSX** (no TypeScript!).
Relive the nostalgia: terrible brushes, clunky menus, weird color palette — all faithfully recreated in the browser.

![MS Paint Clone Screenshot](./imgs/paintwndwstatus.png)

Live Demo → (add your link here later)

## Features (100% faithful to the original)

- Pencil, Brush, Airbrush, Eraser
- Line, Rectangle, Polygon, Ellipse (filled & outline)
- Paint Bucket (flood fill)
- Text Tool
- Color Picker (eyedropper)
- Magnifier (zoom)
- Full menu bar: File / Edit / View / Image / Colors / Help
- Sidebar toolbox exactly like the original
- Custom color palette editor
- Undo/Redo (Ctrl+Z / Ctrl+Y)
- Open & Save as PNG
- Image → Attributes (resize canvas/image)
- Works perfectly on desktop (mouse) and touch devices

## Tech Stack (Pure JavaScript!)

- React 18 + JSX
- Vite (super fast dev server)
- Plain CSS (no frameworks, no Tailwind — just like 1999)
- HTML5 Canvas for all drawing
- Zero external drawing libraries

## Project Structure

```
src/
├── components/
│   ├── container1/          # Top menu bar
│   │   ├── Menubar.jsx
│   │   ├── FileMenu.jsx
│   │   ├── EditMenu.jsx
│   │   ├── ViewMenu.jsx
│   │   ├── ImageMenu.jsx
│   │   ├── ColorMenu.jsx
│   │   └── DropdownContainer.jsx
│   ├── container2/          # Main workspace
│   │   ├── Canvas.jsx       # The actual drawing canvas + all tools logic
│   │   └── Sidebar.jsx      # Toolbox (pencil, eraser, bucket, etc.)
│   ├── container3/
│   │   └── Pallete.jsx      # Bottom color palette + custom colors
│   ├── container4/
│   │   └── Footer.jsx       # Status bar (mouse coordinates, zoom %)
│   └── App.jsx
├── css/
│   ├── root.css             # Global styles & variables
│   ├── container1.css       # Menu bar styling
│   ├── container2.css       # Canvas + sidebar
│   ├── container3.css       # Color palette
│   └── container4.css       # Footer
├── imgs/                    # All original MS Paint icons & references
└── main.jsx                 # React entry point
```

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/awaisAhmed19/mspaint.git
cd mspaint
npm install
```

### 2. Run Locally

```bash
npm run dev
```

Open http://localhost:5173

## Keyboard Shortcuts (Exactly like the real MS Paint!)

| Shortcut     | Action              |
| ------------ | ------------------- |
| Ctrl + Z     | Undo                |
| Ctrl + Y     | Redo                |
| Ctrl + A     | Select All          |
| Ctrl + O     | Open Image          |
| Ctrl + S     | Save As PNG         |
| Ctrl + + / - | Zoom In / Out       |
| Ctrl + 0     | Actual Size (100%)  |
| Esc          | Cancel current tool |

## Building for Production

```bash
npm run build
```

Deploy the `dist/` folder anywhere (Vercel, Netlify, GitHub Pages, etc.)

## Contributing

Found a bug that makes the eraser act weird? Want to add the legendary **spray can** tool? Pull requests are very welcome!

1. Fork it
2. Create your branch (`git checkout -b feature/spray-can`)
3. Commit (`git commit -m 'Add airbrush/spray tool'`)
4. Push & open a Pull Request

## Credits

- Original Microsoft Paint (Windows 95–XP era)
- Inspired by the amazing [JS Paint](https://jspaint.app) by @1j01
- All icons and layout painstakingly recreated from real screenshots

Made with nostalgia and too much free time.

Now go draw something terrible — just like the old days!

# Ema Sudoku 🥷

Sudoku interattivo per bambini con temi personalizzabili, griglie di diverse dimensioni e grafica colorata.

## Caratteristiche

- **10 Temi**: Numerico, Animalesco, Preistorico, Fruttoso, Geometrico, Sportivo, Vegetale, Goloso, Fiorito, Mostruoso
- **3 Dimensioni**: 4×4, 6×6, 9×9
- **3 Livelli di Difficoltà**: Facile, Medio, Difficile
- **Dark Mode**: Modalità scura per proteggere gli occhi
- **Sistema di Aiuti**: 3 suggerimenti disponibili per ogni partita
- **Responsive**: Funziona perfettamente su desktop, tablet e mobile

## Installazione Locale

### Prerequisiti

- [Node.js](https://nodejs.org/) (versione 16 o superiore)
- npm (incluso con Node.js)

### Passi

1. Clona il repository:
```bash
git clone https://github.com/TUO-USERNAME/ema-sudoku.git
cd ema-sudoku
```

2. Installa le dipendenze:
```bash
npm install
```

3. Avvia il server di sviluppo:
```bash
npm run dev
```

4. Apri il browser su `http://localhost:5173`

## Build per Produzione

Per creare una build ottimizzata per la produzione:

```bash
npm run build
```

I file compilati saranno nella cartella `dist/`.

## Deploy su GitHub Pages

### Metodo 1: Automatico con GitHub Actions

1. Vai su GitHub repository → Settings → Pages
2. Sotto "Source", seleziona "GitHub Actions"
3. Crea il file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

4. Fai commit e push:
```bash
git add .
git commit -m "Add GitHub Actions deployment"
git push
```

Il sito sarà disponibile su: `https://TUO-USERNAME.github.io/ema-sudoku/`

### Metodo 2: Manuale con gh-pages

1. Installa gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Aggiungi questi script in `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Deploya:
```bash
npm run deploy
```

## Tecnologie Utilizzate

- **React 18**: Framework UI
- **Vite**: Build tool veloce
- **Tailwind CSS**: Styling
- **Lucide React**: Icone

## Struttura del Progetto

```
ema-sudoku/
├── src/
│   ├── App.jsx          # Componente principale
│   ├── main.jsx         # Entry point
│   └── index.css        # Stili globali
├── index.html           # HTML template
├── package.json         # Dipendenze
├── vite.config.js       # Configurazione Vite
├── tailwind.config.js   # Configurazione Tailwind
└── README.md
```

## Licenza

MIT

## Autore

Creato per Ema 🥷

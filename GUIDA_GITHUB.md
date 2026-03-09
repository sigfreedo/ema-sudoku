# Guida Passo-Passo per Pubblicare su GitHub

## 1. Preparazione

Prima di iniziare, assicurati di avere:
- ✅ Un account GitHub (già ce l'hai!)
- ✅ Git installato sul tuo computer ([scarica qui](https://git-scm.com/))

## 2. Crea un Nuovo Repository su GitHub

1. Vai su [GitHub](https://github.com)
2. Clicca sul pulsante **"+"** in alto a destra → **"New repository"**
3. Compila i campi:
   - **Repository name**: `ema-sudoku`
   - **Description**: "Sudoku interattivo per bambini"
   - **Public/Private**: Scegli Public
   - ⚠️ **NON** selezionare "Add a README file"
4. Clicca **"Create repository"**

## 3. Carica il Progetto su GitHub

Apri il terminale nella cartella del progetto (`ema-sudoku/`) ed esegui questi comandi:

```bash
# Inizializza Git
git init

# Aggiungi tutti i file
git add .

# Crea il primo commit
git commit -m "Initial commit: Ema Sudoku"

# Collega al repository GitHub (sostituisci TUO-USERNAME con il tuo username GitHub)
git remote add origin https://github.com/TUO-USERNAME/ema-sudoku.git

# Carica su GitHub
git branch -M main
git push -u origin main
```

## 4. Configura GitHub Pages

### Opzione A: Deploy Automatico (Consigliato)

Il progetto include già la configurazione GitHub Actions. Devi solo:

1. Vai sul tuo repository GitHub
2. Clicca su **Settings** (in alto)
3. Nel menu laterale, clicca su **Pages**
4. Sotto **"Source"**, seleziona **"GitHub Actions"**
5. Salva

Il deploy partirà automaticamente! Dopo qualche minuto il sito sarà online su:
```
https://TUO-USERNAME.github.io/ema-sudoku/
```

### Opzione B: Deploy Manuale

Se preferisci controllare manualmente quando pubblicare:

```bash
# Installa gh-pages
npm install --save-dev gh-pages

# Aggiungi questi script in package.json (se non ci sono già):
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Pubblica
npm run deploy
```

Poi configura GitHub Pages:
1. Settings → Pages
2. Source → **"Deploy from a branch"**
3. Branch → **"gh-pages"** / **"/ (root)"**
4. Save

## 5. Aggiornamenti Futuri

Quando modifichi il codice:

```bash
# Aggiungi le modifiche
git add .

# Crea un commit
git commit -m "Descrizione delle modifiche"

# Carica su GitHub
git push
```

Se hai configurato GitHub Actions, il sito si aggiornerà automaticamente!
Se usi il deploy manuale, devi fare `npm run deploy` ogni volta.

## 6. Personalizzazione del Base Path

Il file `vite.config.js` ha questa riga:
```javascript
base: '/ema-sudoku/'
```

Se il tuo repository ha un nome diverso, cambia `ema-sudoku` con il nome effettivo.

## 7. Verifica che Funzioni

Dopo il deploy:
1. Vai su `https://TUO-USERNAME.github.io/ema-sudoku/`
2. Il gioco dovrebbe caricarsi perfettamente!

## Risoluzione Problemi

### Il sito non si carica
- Aspetta 2-3 minuti dopo il primo deploy
- Controlla che il `base` in `vite.config.js` corrisponda al nome del repository
- Vai su Actions nel repository per vedere se ci sono errori

### 404 Not Found
- Assicurati che GitHub Pages sia attivo in Settings → Pages
- Verifica che il branch sia corretto (main o gh-pages)

### Modifiche non visibili
- Fai un "hard refresh" nel browser (Ctrl+Shift+R su Windows, Cmd+Shift+R su Mac)
- Aspetta qualche minuto per la propagazione

## Comandi Utili

```bash
# Vedere lo stato dei file
git status

# Vedere la cronologia dei commit
git log

# Annullare modifiche non committate
git checkout .

# Creare un nuovo branch
git checkout -b nome-branch
```

---

**Fatto!** 🎉 Il tuo Ema Sudoku è online e accessibile da tutto il mondo!

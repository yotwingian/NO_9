# Instruktioner — Studieplatformen NP åk 9

## Mappstruktur

Lägg alla filer i SAMMA mapp:

```
np-fysik/
├── index.html                        ← hubben (den här filen)
├── fysik_el_magnetism.html
├── fysik_kraft_rorelse.html
├── fysik_materia_varme.html
├── fysik_tryck.html
├── fysik_arbete_energi_effekt.html
├── fysik_ljud_ljus.html
├── fysik_karnfysik.html
├── fysik_universum.html
└── fysik_energiforsorjning.html
```

---

## Steg 1 — Cursor: koppla localStorage till kapitelfilerna

Öppna Cursor, tryck **Cmd+L** (Mac) eller **Ctrl+L** (Windows) för att öppna
Chat, och klistra in följande prompt:

---

I have 9 HTML chapter files for a Swedish physics study app. Each file has:
- A `<script>` block with variables `cardStates`, `fAnswered`, `allCards`, `quizItems`
- A function `updateMainProgress()`
- An init block at the bottom with `renderCard();` and `buildQuiz();`

Apply these three changes to ALL 9 files:

### Change 1 — Add STORAGE_KEY as the very first line inside `<script>`
Use the key from the table below for each file.

```js
const STORAGE_KEY = 'REPLACE_WITH_KEY';
```

### Change 2 — Replace `updateMainProgress()` entirely

```js
function updateMainProgress() {
  const good   = Object.values(cardStates).filter(v => v === 'good').length;
  const fRight = Object.values(fAnswered).filter(v => v === true).length;
  const total  = allCards.length + quizItems.length;
  const pct    = Math.min(100, Math.round(((good + fRight) / total) * 100));
  document.getElementById('mainProgress').style.width = pct + '%';
  document.getElementById('progressText').textContent = (good + fRight) + ' av ' + total + ' klara';
  localStorage.setItem(STORAGE_KEY + '_progress', JSON.stringify({
    pct, good, fRight, total,
    cardStates: Object.assign({}, cardStates),
    fAnswered:  Object.assign({}, fAnswered),
  }));
}
```

### Change 3 — Add `restoreProgress()` and call it before `renderCard()`

Add this function just before the init block:

```js
function restoreProgress() {
  const raw = localStorage.getItem(STORAGE_KEY + '_progress');
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    if (data.cardStates) Object.entries(data.cardStates).forEach(([k,v]) => { cardStates[parseInt(k)] = v; });
    if (data.fAnswered)  Object.entries(data.fAnswered).forEach(([k,v])  => { fAnswered[k] = v; });
  } catch(e) {}
}
```

Change the init block from:
```js
renderCard();
buildQuiz();
```
to:
```js
restoreProgress();
renderCard();
buildQuiz();
```

### File → STORAGE_KEY table

| Fil                              | STORAGE_KEY                   |
|----------------------------------|-------------------------------|
| fysik_el_magnetism.html          | fysik_el_magnetism            |
| fysik_kraft_rorelse.html         | fysik_kraft_rorelse           |
| fysik_materia_varme.html         | fysik_materia_varme           |
| fysik_tryck.html                 | fysik_tryck                   |
| fysik_arbete_energi_effekt.html  | fysik_arbete_energi_effekt    |
| fysik_ljud_ljus.html             | fysik_ljud_ljus               |
| fysik_karnfysik.html             | fysik_karnfysik               |
| fysik_universum.html             | fysik_universum               |
| fysik_energiforsorjning.html     | fysik_energiforsorjning       |

---

## Steg 2 — Publicera på GitHub Pages (gratis, noll extra konto)

```bash
# 1. Skapa ett nytt repo på github.com, t.ex. "np-fysik"
#    Sätt det till Public (krävs för gratis Pages)

# 2. I terminalen, inne i din projektmapp:
git init
git add .
git commit -m "NP Fysik åk 9 — komplett instuderingsmaterial"
git branch -M main
git remote add origin https://github.com/DITTANVANDARNAMN/np-fysik.git
git push -u origin main

# 3. På github.com:
#    Gå till repot → Settings → Pages
#    Source: "Deploy from a branch"
#    Branch: main / (root)
#    Klicka Save

# 4. Efter ~1 minut är sajten live på:
#    https://DITTANVANDARNAMN.github.io/np-fysik/
```

### GitHub Pages vs Vercel — varför Pages?

| | GitHub Pages | Vercel |
|---|---|---|
| Konto | Redan på GitHub | Extra konto |
| Setup | En checkbox i Settings | Importera repo, konfigurera |
| Statisk HTML | ✅ Perfekt | ✅ Perfekt |
| localStorage | ✅ Fungerar | ✅ Fungerar |
| Gratis | ✅ (public repo) | ✅ (hobby-plan) |
| Bra för | Det här projektet | Nästa-generations-app med backend |

**Slutsats:** GitHub Pages är enklare och räcker mer än väl.

---

## Lägga till Kemi eller Biologi senare

Det enda du behöver göra i `index.html` är att:
1. Skapa kapitelfilerna (samma struktur som fysikfilerna)
2. Öppna `index.html` och ändra `comingSoon: true` till `comingSoon: false`
   för det ämne du vill aktivera
3. Pusha till GitHub — Pages uppdateras automatiskt inom sekunder

Inget annat i index.html behöver ändras.

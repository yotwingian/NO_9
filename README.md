# Studieplatformen — NP åk 9

Interaktiv studieplattform inför **nationella provet i fysik (åk 9)**: flashkort, förståelsefrågor, resonemang och NP-frågor per kapitel. Framsteg sparas lokalt i webbläsaren (`localStorage`).

**Live (GitHub Pages):** [https://yotwingian.github.io/NO_9/](https://yotwingian.github.io/NO_9/)

---

## Köra lokalt

1. **Dubbelklicka på `index.html`** i projektmappen (öppnas i standardwebbläsaren).  
   Fungerar om du bara vill läsa lokalt; vissa webbläsare kan vara strängare med `file://` och skript.

2. **Rekommenderat:** öppna mappen i **VS Code/Cursor** och använd **Live Server** (eller motsvarande) så att sidan servas över `http://localhost:...` — då beter sig sidan som på nätet och `localStorage`/länkar brukar fungera förutsägbart.

---

## Mappstruktur

```
├── index.html                 # Startsida: val av ämne och kapitel, total progress
├── fysik_el_magnetism.html
├── fysik_kraft_rorelse.html
├── fysik_materia_varme.html
├── fysik_tryck.html
├── fysik_arbete_energi.html
├── fysik_ljud_ljus.html
├── fysik_karnfysik.html
├── fysik_universum.html
├── fysik_energiforsorjning.html
├── INSTRUKTIONER.md           # Extra anteckningar (om den finns)
├── README.md
└── .gitignore
```

Varje `fysik_*.html` är ett självständigt kapitel med egen CSS/JS och en unik `STORAGE_KEY` (t.ex. `fysik_tryck`) som används till nyckeln `…_progress` i `localStorage`. Startsidan läser samma nyckel genom kapitelns filnamn (utan `.html`) + `_progress`.

---

## Lägga till ett nytt ämne eller kapitel

All konfiguration av ämnen och kapitel görs i **`index.html`** i arrayen **`SUBJECTS`** (se kommentaren högst upp i skriptet):

- **Nytt ämne:** lägg till ett nytt objekt i `SUBJECTS` med `id`, `label`, `icon`, `color`, `chapters: []` och vid behov `comingSoon: true`.
- **Nytt kapitel:** lägg till ett objekt i rätt ämnes `chapters` med minst `id`, `num`, `icon`, `color`, `title`, `sub`, `file` (t.ex. `mitt_nya_kapitel.html`).
- Skapa motsvarande HTML-fil i projektroten och använd samma **filnamn** som i `file`. I kapitelfilen ska `const STORAGE_KEY = 'filnamn_utan_html';` matcha (t.ex. `mitt_nya_kapitel` för `mitt_nya_kapitel.html`).

Kapitel utan färdig sida sätter `file: ''` (kortet visas som låst ”kommer snart” om ämnet inte är `comingSoon`).

---

## GitHub Pages

Aktivera Pages i repots inställningar (t.ex. branch **main**, mapp **/ (root)**). Startsidan ska vara `index.html` i roten. Tillbaka-länkar i kapitlen pekar på `index.html` med relativ sökväg och fungerar när alla filer ligger i samma katalog som på GitHub Pages.

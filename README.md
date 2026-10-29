# KGBV Mandu Ramgarh — Every Drop Counts

A polished, responsive water-conservation awareness website built with plain HTML, CSS and JavaScript.

## Files
- `index.html` — semantic website structure, content, accessible forms and sections
- `styles.css` — responsive design system, motion, layouts and print styles
- `script.js` — mobile navigation, interactive water cycle, method tabs, school action-plan preview, student checklist, pledge certificate, quiz, slogan copy and FAQ behavior

## Run locally
No build step or package installation is required.

### Option 1: Open directly
Open `index.html` in a modern browser. Most interactions work directly. Clipboard copying works best on localhost or HTTPS.

### Option 2: Local server (recommended)
With Python installed, run this command in the project folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy
Upload all three files to any static hosting provider, such as Netlify, GitHub Pages or Vercel static hosting. Keep the files in the same folder.

## Design and behavior
- Mobile-first responsive layout and accessible keyboard focus
- Reduced-motion preference support
- Interactive water cycle and conservation-method tabs
- Editable school action-plan preview (not transmitted or saved)
- Daily challenge progress (temporary; resets on refresh)
- Pledge and print-friendly certificate (optional name is not transmitted or saved)
- Eight-question quiz with explanations and answer review
- Slogan copying, FAQ accordion, sticky header and mobile menu

## Content and privacy notes
- No backend, account, database, analytics or form submission endpoint is used.
- School action-plan entries and optional certificate name remain in the browser and are not transmitted by this site.
- The daily challenge is intentionally not saved; progress resets on refresh.
- The school initiative section is a proposed framework, not a claim of completed school activity.
- General regional context is not a diagnosis of local water conditions. Check current official sources for local data and programme status.
- Untreated rainwater, greywater and wastewater should not be assumed safe to drink.
- External images and fonts are loaded from third-party services and therefore require an internet connection. Replace these URLs with properly licensed local assets for offline use or if your deployment requires local asset control.
- Official resource links are provided as starting points; review current URLs and dated publications before formal presentation or publication.

## Suggested final checks
Test at narrow mobile, tablet and desktop widths; keyboard through the mobile menu, tabs, quiz and forms; verify external links; and run Lighthouse in the target browser. This project has not been represented as independently Lighthouse-certified.

# Firefox Extension Boilerplate Prompt

## The Prompt

```md
**Role**: Act as an Expert Browser Extension Architect.

**Task**: Scaffold a barebones, modular, and highly commented Vite + TypeScript browser extension foundation optimized for **Firefox Manifest V3**.

**Core Requirements**:

1. **Architecture**: Use `webextension-polyfill` to ensure modern `browser.*` Promise-based APIs are used. Separate the presentation (Popup) from the persistent logic (Background).
2. **Firefox MV3 Compatibility**:
   - Use `background.scripts` instead of `service_worker` in `manifest.json`.
   - Include `browser_specific_settings` with a placeholder Gecko ID.
3. **Build Config**: Configure `vite.config.ts` to output unhashed files (`popup.js`, `background.js`) to the root of the `dist` folder.
4. **Aesthetic**: Apply a "Digital Wizard / Arcane Tech" theme to the popup:
   - **Background**: Dark slate (`#0f172a`).
   - **Accents**: Emerald green (`#10b981`) for text glows and borders.
   - **Container**: Semi-transparent glassmorphism with `backdrop-filter: blur(12px)`.
5. **Clean Slate**: Provide an empty UI with a header and a status indicator, but **no application logic** (no counters).

**File Structure Needed**:

- `package.json` (Includes `webextension-polyfill`, `@types/webextension-polyfill`, `vite`, `typescript`).
- `tsconfig.json` (Configured for DOM and WebExtensions).
- `vite.config.ts` (Multi-entry, no hashing).
- `public/manifest.json` (Firefox MV3 compatible).
- `index.html` (The "Arcane" themed UI shell).
- `src/popup.ts` (Boilerplate with API initialization and environment check).
- `src/background.ts` (Boilerplate with message listener shell).

**Instructional Comments**: Add extensive comments explaining the Manifest V3 lifecycle in Firefox and why `webextension-polyfill` is used.
```

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
3. **Build Config**: Configure `vite.config.ts` to output unhashed files (`popup.js`, `background.js`, `content.js`) to the root of the `dist` folder using `build.rollupOptions.input`.
4. **Aesthetic**: Apply a "Digital Wizard / Arcane Tech" theme to the popup:
   - **Background**: Dark slate (`#0f172a`).
   - **Accents**: Emerald green (`#10b981`) for text glows, subtle pulsing box-shadows, and borders.
   - **Container**: Semi-transparent glassmorphism with `backdrop-filter: blur(12px)`.
   - **Typography**: Use a sleek monospace font for the status indicator to feel like a terminal/sentry.
5. **Permissions**: Include standard blocker permissions in the manifest (`storage`, `tabs`, and placeholder web request permissions).

**File Structure Needed**:

- `package.json` (Includes `webextension-polyfill`, `@types/webextension-polyfill`, `vite`, `typescript`).
- `tsconfig.json` (Configured for DOM and WebExtensions).
- `vite.config.ts` (Multi-entry, no hashing).
- `public/manifest.json` (Firefox MV3 compatible).
- `index.html` (The "Arcane" themed UI shell).
- `src/popup.ts` (Boilerplate with API initialization and environment check).
- `src/background.ts` (Boilerplate with message listener shell).
- `src/content.ts` (Boilerplate content script injected into `<all_urls>`).

**Instructional Comments**: Add extensive comments explaining the Manifest V3 lifecycle in Firefox and why `webextension-polyfill` is used.
```

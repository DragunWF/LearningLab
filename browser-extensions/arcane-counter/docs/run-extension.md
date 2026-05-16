# Running the Arcane Counter Extension in Firefox

This guide explains how to load and test the Arcane Counter extension in Firefox, specifically for **Firefox Developer Edition**.

## Prerequisites

Ensure you have installed the dependencies and built the project:

```bash
npm install
npm run build
```

---

## 1. Load as a Temporary Add-on

This is the standard way to test extensions during development.

1. Open **Firefox Developer Edition**.
2. In the address bar, type `about:debugging` and press Enter.
3. Click on **"This Firefox"** in the left sidebar.
4. Click the **"Load Temporary Add-on..."** button.
5. Navigate to your project's `dist/` folder.
6. Select the `manifest.json` file.

The extension is now loaded! You should see it in the list of extensions on that page.

---

## 2. Accessing the Popup

1. Click the **Extensions** icon (puzzle piece) in the Firefox toolbar.
2. Find **"Arcane Counter (Learn)"**.
3. (Optional) Click the gear icon next to it and select **"Pin to Toolbar"** for easier access.
4. Click the extension icon to open the **Arcane Node** popup.

---

## 3. Debugging & Logs

Because browser extensions have multiple parts, logs appear in different places:

### Background Script Logs

1. Go back to `about:debugging#/runtime/this-firefox`.
2. Find the **Arcane Counter** entry.
3. Click the **"Inspect"** button.
4. A new window will open showing the console for the Background Service Worker.

### Popup Logs

1. Open the extension popup from the toolbar.
2. **Right-click** anywhere inside the popup.
3. Select **"Inspect"** (or press `Cmd + Option + I`).
4. This opens the developer tools specifically for the popup's window.

---

## 4. Special Notes for Developer Edition

Firefox Developer Edition allows you to run unsigned extensions permanently (unlike the standard edition, which removes them when you close the browser).

If you want to keep the extension loaded after a restart:

1. Go to `about:config`.
2. Search for `xpinstall.signatures.required`.
3. Set it to `false`.
4. However, for active development, the **"Load Temporary Add-on"** method (Step 1) is still recommended as it automatically refreshes some components when you reload.

---

## 5. Troubleshooting

- **"ReferenceError: chrome is not defined"**: Ensure you are looking at the popup via the toolbar icon, and NOT by opening `localhost:5173` or `index.html` as a file.
- **Changes not showing**: After making code changes, you MUST run `npm run build` and then click the **"Reload"** button on the `about:debugging` page for that extension.

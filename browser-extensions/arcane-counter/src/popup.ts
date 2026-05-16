/**
 * POPUP LOGIC
 *
 * The Popup is transient—it is destroyed when closed. Therefore, it should never
 * hold the primary state. Instead, it acts as a "View" that communicates with the
 * "Controller" (Background Script) via message passing.
 */

const counterDisplay = document.getElementById(
  "counter-display",
) as HTMLDivElement;
const incrementBtn = document.getElementById(
  "increment-btn",
) as HTMLButtonElement;

/**
 * INITIALIZATION
 * When the popup opens, we immediately ask the background script for the
 * current count to ensure the UI is in sync.
 */
async function init() {
  console.log("[Popup] Initializing...");

  // chrome.runtime.sendMessage is the primary way to talk to the background script.
  // It returns a Promise in Manifest V3 (Chrome 99+).
  try {
    const response = await chrome.runtime.sendMessage({ type: "GET_COUNT" });
    updateDisplay(response.count);
  } catch (error) {
    console.error("[Popup] Failed to fetch count:", error);
  }
}

/**
 * UI UPDATER
 * Keeps the DOM manipulation logic separate from communication logic.
 */
function updateDisplay(count: number) {
  counterDisplay.innerText = count.toString();
}

/**
 * EVENT LISTENERS
 * When the user interacts, we don't increment locally. We send a command
 * to the background script so the change is persisted across sessions.
 */
incrementBtn.addEventListener("click", async () => {
  console.log("[Popup] Increment requested");

  try {
    // We send an 'INCREMENT' action to the background.
    // The background handles the logic and returns the new value.
    const response = await chrome.runtime.sendMessage({ type: "INCREMENT" });
    updateDisplay(response.count);
  } catch (error) {
    console.error("[Popup] Failed to increment count:", error);
  }
});

// Start the initialization
init();

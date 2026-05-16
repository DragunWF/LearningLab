import browser from "webextension-polyfill";

/**
 * ARCANE COUNTER - POPUP
 * This script handles the UI and communicates with the background script.
 */

const counterDisplay = document.getElementById(
  "counter-display",
) as HTMLDivElement;
const incrementBtn = document.getElementById(
  "increment-btn",
) as HTMLButtonElement;
const statusText = document.querySelector(".status-text") as HTMLDivElement;

/**
 * ENVIRONMENT CHECK
 * Helps the user understand if they are running in the correct context.
 */
const isExtension = !!(browser.runtime && browser.runtime.id);

if (!isExtension) {
  statusText.innerText = "⚠️ Running as Website (APIs Disabled)";
  statusText.style.color = "#fbbf24";
  console.warn("[Arcane] Extension APIs are unavailable in a standard tab.");
}

async function init() {
  if (!isExtension) return;

  try {
    // webextension-polyfill makes everything return Promises, even in Chrome!
    const response = await browser.runtime.sendMessage({ type: "GET_COUNT" });
    updateDisplay(response.count);
    statusText.innerText = "Aether Connected";
  } catch (error) {
    console.error("[Arcane] Initialization failed:", error);
    statusText.innerText = "Connection Failed";
  }
}

function updateDisplay(count: number) {
  counterDisplay.innerText = count.toString();
}

incrementBtn.addEventListener("click", async () => {
  if (!isExtension) {
    alert(
      "Summoning requires an Extension Context. Please load the 'dist' folder into Firefox.",
    );
    return;
  }

  try {
    const response = await browser.runtime.sendMessage({ type: "INCREMENT" });
    updateDisplay(response.count);
  } catch (error) {
    console.error("[Arcane] Increment failed:", error);
  }
});

// Start the sequence
init();

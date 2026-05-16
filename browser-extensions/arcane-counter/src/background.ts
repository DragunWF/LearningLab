/**
 * BACKGROUND SCRIPT (Service Worker)
 *
 * In Manifest V3, the background script is a Service Worker. It is event-driven
 * and stays idle when not in use. It is the single source of truth for state.
 */

// Key used for persistent storage
import { STORAGE_KEY } from "./constants";

/**
 * MESSAGE LISTENER
 * This is the central hub for handling requests from other parts of the extension (like the popup).
 * 'sendResponse' is used to return data back to the sender.
 */
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log("[Background] Message received:", message);

  if (message.type === "GET_COUNT") {
    // We retrieve the count from persistent storage.
    // chrome.storage.local is asynchronous.
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      const count = result[STORAGE_KEY] || 0;
      sendResponse({ count });
    });
    // CRITICAL: return true to indicate you want to send a response asynchronously.
    return true;
  }

  if (message.type === "INCREMENT") {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      const currentCount = result[STORAGE_KEY] || 0;
      const newCount = currentCount + 1;

      // Persist the new value
      chrome.storage.local.set({ [STORAGE_KEY]: newCount }, () => {
        console.log("[Background] Counter incremented to:", newCount);
        sendResponse({ count: newCount });
      });
    });
    return true;
  }
});

/**
 * LIFECYCLE EVENT: onInstalled
 * Runs once when the extension is first installed or updated.
 * Good for initializing default state.
 */
chrome.runtime.onInstalled.addListener(() => {
  console.log("[Background] Arcane Counter Installed.");
  chrome.storage.local.get([STORAGE_KEY], (result) => {
    if (result[STORAGE_KEY] === undefined) {
      chrome.storage.local.set({ [STORAGE_KEY]: 0 });
    }
  });
});

import browser from 'webextension-polyfill';
import { STORAGE_KEY } from "./constants";

/**
 * ARCANE COUNTER - BACKGROUND
 * The Source of Truth for the extension.
 */

browser.runtime.onMessage.addListener(async (message) => {
  console.log("[Background] Message received:", message);

  if (message.type === "GET_COUNT") {
    const result = await browser.storage.local.get([STORAGE_KEY]);
    return { count: result[STORAGE_KEY] || 0 };
  }

  if (message.type === "INCREMENT") {
    const result = await browser.storage.local.get([STORAGE_KEY]);
    const newCount = (result[STORAGE_KEY] || 0) + 1;
    
    await browser.storage.local.set({ [STORAGE_KEY]: newCount });
    console.log("[Background] New Count:", newCount);
    
    return { count: newCount };
  }
  
  return false;
});

// Initialize storage on installation
browser.runtime.onInstalled.addListener(() => {
  console.log("[Background] Extension Installed.");
  browser.storage.local.get([STORAGE_KEY]).then((result) => {
    if (result[STORAGE_KEY] === undefined) {
      browser.storage.local.set({ [STORAGE_KEY]: 0 });
    }
  });
});

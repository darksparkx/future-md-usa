"use client";

import { useSyncExternalStore } from "react";

const KEY = "faiz-site-option";
const EVENT = "faiz-site-option-change";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot(): 1 | 2 | 3 {
  const saved = localStorage.getItem(KEY);
  if (saved === "3") return 3;
  if (saved === "2") return 2;
  return 1;
}

export function setSiteOption(option: 1 | 2 | 3) {
  localStorage.setItem(KEY, String(option));
  window.dispatchEvent(new Event(EVENT));
}

export function useSiteOption() {
  const option = useSyncExternalStore(subscribe, getSnapshot, () => 1 as const);
  return { option, setOption: setSiteOption };
}

const KEY = "julikart-consent";

export type Consent = "accepted" | "rejected" | null;

export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: "accepted" | "rejected") {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* private mode — treat as session-only */
  }
  window.dispatchEvent(new CustomEvent("julikart:consent", { detail: value }));
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    ym?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  const eventPayload = {
    event: eventName,
    ...payload,
  };

  window.dispatchEvent(new CustomEvent(eventName, { detail: eventPayload }));

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(eventPayload);
  }
}

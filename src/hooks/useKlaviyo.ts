"use client";
import useHasMounted from "@flight-digital/flightdeck/hooks/useHasMounted";
import { useEffect } from "react";

export default function useKlaviyo() {
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (!hasMounted) return;
    const existingScript = document.querySelector(`script[src*="klaviyo.js?company_id=X5gkJe"]`);
    if (existingScript) return;

    // Queue only before klaviyo.js loads; the script assigns the real `window.klaviyo`.
    // A custom Proxy here can fight the embed and is unnecessary for the footer form.
    (window as any)._klOnsite = (window as any)._klOnsite || [];

    const script = document.createElement("script");
    script.src = `https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=X5gkJe`;
    script.async = true;
    script.type = "text/javascript";
    script.onerror = () => {
      console.error("[Klaviyo] Failed to load onsite script");
    };
    document.body.appendChild(script);
  }, [hasMounted]);
}

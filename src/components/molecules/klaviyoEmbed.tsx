"use client";
import useKlaviyo from "@/hooks/useKlaviyo";

interface Props {
  /** Klaviyo embed class, e.g. `klaviyo-form-UdHuPG` from the form install snippet */
  className?: string;
}

/**
 * Empty target div for Klaviyo’s onsite script to hydrate.
 */
export default function KlaviyoEmbed({ className }: Props) {
  useKlaviyo();
  if (className) {
    return <div className={className} />;
  }
  return <div className="klaviyo-form-USDFvx" />;
}

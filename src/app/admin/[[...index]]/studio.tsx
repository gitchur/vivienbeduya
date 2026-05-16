"use client";

import NextSanityStudio from "@flight-digital/flightdeck/boulders/nextSanityStudio";

// Update the logo and colors for your project
const StudioComponent = () => {
  return (
    <NextSanityStudio
      sanityConfigLoader={() => import("../../../../sanity.config")}
      loadingLogoUrl="https://cdn.sanity.io/images/bm3737yn/production/8347c2b6167823c1197d63cf21eba7ec331053fc-1068x640.png"
    />
  );
};

export default StudioComponent;

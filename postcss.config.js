module.exports = async () => {
  const { default: flightdeck } = await import("@flight-digital/flightdeck/postCssPlugin");
  return {
    plugins: [
      flightdeck({
        baseBreakpoint: 768, // If you change this, you need to change the mobileBreakpoint in @/utils/constants.ts,
        responsiveUnit: {
          zoomScaleFactor: 0.25,
          desktop: {
            basewidth: 1440,
            maxScale: 1.5,
            minScale: 0.8,
          },
          mobile: {
            basewidth: 375,
            maxScale: 2,
            minScale: 1,
          },
        },
      }),
    ],
  };
};

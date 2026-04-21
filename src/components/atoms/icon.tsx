import IconBuilder from "@flight-digital/flightdeck/pebbles/iconBuilder";

interface IconProps extends IconBuilderProps {
  asset: "hamburger" | "close" | "arrowRight" | "copy" | "check";
}

export const IconHamburger = (props: IconBuilderProps) => (
  <IconBuilder {...props} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M2.5 4.5H13.5M2.5 8H13.5M2.5 11.5H13.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBuilder>
);

export const IconClose = (props: IconBuilderProps) => (
  <IconBuilder {...props} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M4 12L12 4M4 4L12 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBuilder>
);

export const IconArrowRight = (props: IconBuilderProps) => (
  <IconBuilder {...props} width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6.75 9.75L10.5 6M10.5 6L6.75 2.25M10.5 6H1.5" stroke="currentColor" />
  </IconBuilder>
);

export const IconCopy = (props: IconBuilderProps) => (
  <IconBuilder {...props} stroke="none" fill="currentColor" stroke-width="0" viewBox="0 0 24 24">
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
  </IconBuilder>
);


export const IconCheck = (props: IconBuilderProps) => (
  <IconBuilder {...props} strokeWidth="0" viewBox="0 0 512 512" fill="currentColor" stroke="currentColor">
    <path d="M186.301 339.893L96 249.461l-32 30.507L186.301 402 448 140.506 416 110z"></path>
  </IconBuilder>
);

export const Icon = (props: IconProps) => {
  switch (props.asset) {
    case "hamburger":
      return <IconHamburger {...props} />;
    case "close":
      return <IconClose {...props} />;
    case "arrowRight":
      return <IconArrowRight {...props} />;
    case "copy":
      return <IconCopy {...props} />;
    case "check":
      return <IconCheck {...props} />;
    default:
      return null;
  }
};
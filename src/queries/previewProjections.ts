import { componentBuilderProjection } from "./blocks";
import { expandProjections } from "./groq";
import { pageProjection } from "./pages";

/** Expanded projections for Flightdeck preview, which cannot declare GROQ functions. */
export const pageFields = expandProjections(pageProjection);
export const componentBuilderPreviewFields = expandProjections(componentBuilderProjection);

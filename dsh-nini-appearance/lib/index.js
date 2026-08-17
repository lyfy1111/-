//#region src/appearance-settings.ts
/** Appearance customization settings persisted in localStorage. */
/** Settings namespace owned by the appearance plugin (kept for the record). */
const APPEARANCE_SETTINGS_NAMESPACE = "nini-appearance";
/**
* The color roles the customizer exposes. Each role maps to one or more
* `--dsw-alias-*` tokens; an empty string means "keep the stock token".
* Bubble roles were removed: the harness renders its only bubble background
* on user messages (assistant turns have none), so bubbles now follow the
* accent color instead of owning separate settings.
*/
const APPEARANCE_ROLES = [
	"accent",
	"background",
	"panel",
	"input",
	"text",
	"border"
];
/** The section with every color role left stock and every effect off. */
const DEFAULT_SETTINGS = {
	accent: "",
	background: "",
	panel: "",
	input: "",
	text: "",
	border: "",
	backgroundImage: "",
	backgroundVideo: "",
	imageDark: false,
	backgroundOpacity: 1,
	backgroundFit: "cover",
	backgroundPositionX: 50,
	backgroundPositionY: 50,
	backgroundBlur: 0,
	scrim: 0,
	surfaceAlpha: 1,
	sidebarOpaque: false,
	glassBlur: 0,
	emphasisAlpha: .22,
	preset: ""
};
//#endregion
//#region src/index.ts
/**
* No host-side work: everything runs in the browser half.
* @param ctx - Host context (unused).
*/
function apply(_ctx) {}
//#endregion
export { APPEARANCE_ROLES, APPEARANCE_SETTINGS_NAMESPACE, DEFAULT_SETTINGS, apply };

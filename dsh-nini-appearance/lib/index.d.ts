import { Context } from "@deepseek-ai/cordis";
//#region src/appearance-settings.d.ts
/** Appearance customization settings persisted in localStorage. */
/** Settings namespace owned by the appearance plugin (kept for the record). */
declare const APPEARANCE_SETTINGS_NAMESPACE = "nini-appearance";
/**
 * The color roles the customizer exposes. Each role maps to one or more
 * `--dsw-alias-*` tokens; an empty string means "keep the stock token".
 * Bubble roles were removed: the harness renders its only bubble background
 * on user messages (assistant turns have none), so bubbles now follow the
 * accent color instead of owning separate settings.
 */
declare const APPEARANCE_ROLES: readonly ["accent", "background", "panel", "input", "text", "border"];
/** One customizable color role id. */
type AppearanceRole = typeof APPEARANCE_ROLES[number];
/** Hex color fields, keyed by role. */
type AppearanceColors = Record<AppearanceRole, string>;
/**
 * Durable appearance section. Color fields hold `#rrggbb` or `''` (stock);
 * the image field holds a compressed data URL or `''`; the numeric fields are
 * plain percentages/px values with their stock value as the default.
 */
interface AppearanceSettings extends AppearanceColors {
  /** Compressed background image data URL; '' clears the image. */
  backgroundImage: string;
  /** IndexedDB key of the background video; '' clears the video. */
  backgroundVideo: string;
  /** True when the compressed image sampled as dark (< 35% average brightness). */
  imageDark: boolean;
  /** Background image layer opacity, 0..1. */
  backgroundOpacity: number;
  /** How the wallpaper is fitted inside the viewport. */
  backgroundFit: 'cover' | 'contain' | 'fill';
  /** Horizontal focal point of the wallpaper, 0..100%. */
  backgroundPositionX: number;
  /** Vertical focal point of the wallpaper, 0..100%. */
  backgroundPositionY: number;
  /** Background image blur in px, 0..30. */
  backgroundBlur: number;
  /** Readability scrim over the background image, 0..1 (0 = no veil). */
  scrim: number;
  /** UI surface opacity, 0..1 (1 = fully opaque surfaces). */
  surfaceAlpha: number;
  /** Keep the sidebar fill opaque even when surfaceAlpha is below 1. */
  sidebarOpaque: boolean;
  /** Glass blur in px added to the wallpaper blur, 0..20 (0 = no extra blur). */
  glassBlur: number;
  /** Tint alpha of emphasized text chips (inline code), 0..0.45. */
  emphasisAlpha: number;
  /** Last applied preset id, or 'custom' after manual edits. */
  preset: string;
}
/** The section with every color role left stock and every effect off. */
declare const DEFAULT_SETTINGS: AppearanceSettings;
//#endregion
//#region src/index.d.ts
/**
 * No host-side work: everything runs in the browser half.
 * @param ctx - Host context (unused).
 */
declare function apply(_ctx: Context): void;
//#endregion
export { APPEARANCE_ROLES, APPEARANCE_SETTINGS_NAMESPACE, type AppearanceRole, type AppearanceSettings, DEFAULT_SETTINGS, apply };
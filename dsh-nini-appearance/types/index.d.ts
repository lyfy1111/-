export type AppearanceRole = 'accent' | 'background' | 'panel' | 'input' | 'text' | 'border'

export interface AppearanceSettings extends Record<AppearanceRole, string> {
  backgroundImage: string
  backgroundVideo: string
  imageDark: boolean
  backgroundOpacity: number
  backgroundFit: 'cover' | 'contain' | 'fill'
  backgroundPositionX: number
  backgroundPositionY: number
  backgroundBlur: number
  scrim: number
  surfaceAlpha: number
  sidebarOpaque: boolean
  glassBlur: number
  emphasisAlpha: number
  preset: string
}

export const APPEARANCE_SETTINGS_NAMESPACE: string
export const APPEARANCE_ROLES: readonly AppearanceRole[]
export const DEFAULT_SETTINGS: AppearanceSettings
export function apply(context: unknown): void

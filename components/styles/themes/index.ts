import { ThemeTypes } from '../../utils/prop-types'

export interface CfxUIThemesPalette {
  /* eslint-disable @typescript-eslint/camelcase */
  accents_1: string
  accents_2: string
  accents_3: string
  accents_4: string
  accents_5: string
  accents_6: string
  accents_7: string
  accents_8: string
  /* eslint-enable camelcase */
  background: string
  foreground: string
  selection: string
  secondary: string
  code: string
  border: string
  success: string
  successLight: string
  successDark: string
  error: string
  errorLight: string
  errorDark: string
  warning: string
  warningLight: string
  warningDark: string
  cyan: string
  cyanLighter: string
  cyanLight: string
  cyanDark: string
  violet: string
  violetLighter: string
  violetLight: string
  violetDark: string
  link: string
  purple: string
  magenta: string
  alert: string

  // conflux
  cTheme0: string
  cTheme1: string
  cTheme2: string
  cTheme3: string
  cTheme4: string
  cTheme5: string
  cTheme6: string
  cTheme7: string
  cNeutral0: string
  cNeutral1: string
  cNeutral2: string
  cNeutral3: string
  cNeutral4: string
  cNeutral5: string
  cNeutral6: string
  cNeutral7: string
  cNeutral8: string
}

export interface CfxUIThemesExpressiveness {
  linkStyle: string
  linkHoverStyle: string
  dropdownBoxShadow: string
  scrollerStart: string
  scrollerEnd: string
  shadowSmall: string
  shadowMedium: string
  shadowLarge: string
  portalOpacity: number

  // radius
  R0: string
  R1: string
  R2: string
  R3: string
  R4: string
  R5: string

  // border-width
  L1: string
  L2: string
  L4: string

  // border-style
  cLineStyle1: string
  cLineStyle2: string
  cLineStyle3: string

  // drop shadows
  D0: string
  D1: string
  D2: string
  D3: string
  D4: string
  D5: string
}

export interface CfxUIThemesLayout {
  gap: string
  gapNegative: string
  gapHalf: string
  gapHalfNegative: string
  gapQuarter: string
  gapQuarterNegative: string
  pageMargin: string
  pageWidth: string
  pageWidthWithMargin: string
  breakpointMobile: string
  breakpointTablet: string
  // radius: string
}

export interface CfxUIThemesFont {
  sans: string
  mono: string
}

export interface BreakpointsItem {
  min: string
  max: string
}

export interface CfxUIThemesBreakpoints {
  xs: BreakpointsItem
  sm: BreakpointsItem
  md: BreakpointsItem
  lg: BreakpointsItem
  xl: BreakpointsItem
}

export interface CfxUIThemes {
  type: ThemeTypes
  font: CfxUIThemesFont
  layout: CfxUIThemesLayout
  palette: CfxUIThemesPalette
  breakpoints: CfxUIThemesBreakpoints
  expressiveness: CfxUIThemesExpressiveness
}

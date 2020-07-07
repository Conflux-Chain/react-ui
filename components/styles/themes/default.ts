import { ZeitUIThemes, ZeitUIThemesPalette, ZeitUIThemesExpressiveness } from './index'
import { defaultFont, defaultBreakpoints, defaultLayout } from './shared'

export const palette: ZeitUIThemesPalette = {
  /* eslint-disable @typescript-eslint/camelcase */
  accents_1: '#fafafa',
  accents_2: '#eaeaea',
  accents_3: '#999',
  accents_4: '#888',
  accents_5: '#666',
  accents_6: '#444',
  accents_7: '#333',
  accents_8: '#111',
  /* eslint-enable camelcase */
  background: '#fff',
  foreground: '#000',
  selection: '#79ffe1',
  secondary: '#666',
  code: '#f81ce5',
  border: '#eaeaea',
  error: '#E15C56',
  errorLight: '#FF8585',
  errorLighter: '#f7d4d6',
  errorDark: '#B34A50',
  success: '#58F17A',
  successLight: '#8AFB88',
  successLighter: '#d3e5ff',
  successDark: '#61BE8F',
  warning: '#FFC438',
  warningLight: '#FFDE40',
  warningLighter: '#ffefcf',
  warningDark: '#F48B4F',
  cyan: '#50e3c2',
  cyanLighter: '#aaffec',
  cyanLight: '#79ffe1',
  cyanDark: '#29bc9b',
  violet: '#7928ca',
  violetLighter: '#e3d7fc',
  violetLight: '#8a63d2',
  violetDark: '#4c2889',
  purple: '#f81ce5',
  alert: '#ff0080',
  magenta: '#eb367f',
  link: '#0070f3',

  // conflux ui
  cThem0: '#E8F4FF',
  cThem1: '#CCE5FF',
  cThem2: '#C0D8FC',
  cThem3: '#A9BDE6',
  cThem4: '#6D8BC8',
  cThem5: '#0054FE',
  cThem6: '#0433DC',
  cThem7: '#0626AE',
  cBlack0: '#282D30',
  cGray0: '#F9FAFB',
  cGray1: '#F1F3F6',
  cGray2: '#EBECED',
  cGray3: '#DBDDE0',
  cGray4: '#AAAFBB',
  cGray5: '#9B9EAC',
  cGray6: '#444444',
  cWhite0: '#FFFFFF',
  brandLight: '#001B36',
  brand: '#0054FE',
  brandDark: '#0626AE',
}

export const expressiveness: ZeitUIThemesExpressiveness = {
  linkStyle: 'none',
  linkHoverStyle: 'none',
  dropdownBoxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.02)',
  scrollerStart: 'rgba(255, 255, 255, 1)',
  scrollerEnd: 'rgba(255, 255, 255, 0)',
  shadowSmall: '0 5px 10px rgba(0, 0, 0, 0.12)',
  shadowMedium: '0 8px 30px rgba(0, 0, 0, 0.12)',
  shadowLarge: '0 30px 60px rgba(0, 0, 0, 0.12)',
  portalOpacity: 0.25,

  // radius
  R0: '0',
  R1: '2px',
  R2: '4px',
  R3: '8px',
  R4: '12px',
  R5: '50%',

  // drop shadows
  D0: 'none',
  D1: '0px 0px 2px rgba(0, 0, 0, 0.08)',
  D2: '0px 4px 8px rgba(0, 0, 0, 0.08)',
  D3: '0px 4px 8px rgba(0, 0, 0, 0.16)',
  D4: '0px 8px 16px rgba(0, 0, 0, 0.24)',
}

export const font = defaultFont

export const breakpoints = defaultBreakpoints

export const layout = defaultLayout

export const themes: ZeitUIThemes = {
  type: 'light',
  font,
  layout,
  palette,
  breakpoints,
  expressiveness,
}

export default themes

import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#DBD6D6',
  200: '#F4F6F8',
  300: '#E9EFF2',
  400: '#C4CDD5',
  500: '#969191',
  600: '#676363',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  1000: '#000000'
};

const PRIMARY = {
  lighter: '#413857',
  light: '#5C5470',
  main: '#352F44',
  dark: '#2A2438',
  darker: '#1C1825',
  contrastText: '#DBD8E3',
};

const SECONDARY = {
  lighter: '#F4F3F6',
  light: '#E9E7EE',
  main: '#DBD8E3',
  dark: '#D3D0DD',
  darker: '#C8C4D4',
  contrastText: '#352F44',
};

const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff',
};

const SUCCESS = {
  lighter: '#E8FFF3',
  light: '#AAF27F',
  main: '#50CD89',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800],
};

const WARNING = {
  lighter: '#FFF4DE',
  light: '#FFD333',
  main: '#FFC700',
  dark: '#E0B000',
  darker: '#B89000',
  contrastText: '#000',
};

const ERROR = {
  lighter: '#FFE2E5',
  light: '#FFA48D',
  main: '#F64E60',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff',
};

const palette = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: '#787373',
  text: {
    primary: GREY[1000],
    secondary: GREY[600],
    disabled: GREY[500],
  },
  background: {
    paper: '#fff',
    default: GREY[100],
    neutral: GREY[200],
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;

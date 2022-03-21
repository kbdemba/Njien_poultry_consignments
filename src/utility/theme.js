import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main:'#27BFD3',
      light: '#D8F8FC'
    },
    background: {
      default: '#FCFCFC',
    },
  },
});

// theme = responsiveFontSizes(theme);
export default theme;
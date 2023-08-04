import { createTheme } from '@mui/material';

const theme = createTheme({
   palette: {
      primary: {
         main: '#1E293B'
      },
      secondary: {
         main: '#000000'
      },
   },
   typography: {
      fontFamily: `'WorkSans','Roboto','Arial'`,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      fontWeightExtraBold: 800,
      fontWeightBlack: 900,
      button: {
         textTransform: 'none'
      }
   },
   direction: 'ltr',
})

export default theme;
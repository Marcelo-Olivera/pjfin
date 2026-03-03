import { createTheme } from '@mui/material/styles'

const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#212121',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#757575',
      },
      background: {
        default: mode === 'light' ? '#F5F5F5' : '#121212',
        paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
      },
      text: {
        primary: mode === 'light' ? '#212121' : '#EEEEEE',
        secondary: mode === 'light' ? '#9E9E9E' : '#757575',
      },
      divider: mode === 'light' ? '#E0E0E0' : '#2A2A2A',
    },
    typography: {
      fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
      h1: { fontWeight: 700, letterSpacing: '-0.5px' },
      h2: { fontWeight: 700, letterSpacing: '-0.3px' },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
        },
      },
    },
  })

export default getTheme
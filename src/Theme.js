import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
      main2: '#9cd4ff',
      main3: '#e2f0ff',
    },
    secondary: {
      main: '#f50057',
      main2: '#b6003f',
    },
    diff: {
      background: '#fff6f6',
      color: '#e50000',
    },
    fact: {
      background: '#eeeeee',
    },
  },
  spacing: 6,
})

const colorBlindLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
      main2: '#9cd4ff',
      main3: '#e2f0ff',
    },
    secondary: {
      main: '#f50057',
      main2: '#b6003f',
    },
    diff: {
      background: '#fff1c8',
      color: '#0C7BDC',
    },
    fact: {
      background: '#eeeeee',
    },
  },
  spacing: 6,
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3e849a',
      main2: '#124757',
      main3: '#181e1f',
    },
    secondary: {
      main: '#be1a51',
      main2: '#851339',
    },
    diff: {
      background: '#230000',
      color: '#ffbebe',
    },
    fact: {
      background: '#4f4f4f',
    },
  },
  spacing: 6,
})

const colorBlindDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3e849a',
      main2: '#124757',
      main3: '#181e1f',
    },
    secondary: {
      main: '#be1a51',
      main2: '#851339',
    },
    diff: {
      background: '#4d3600',
      color: '#5eb3fa',
    },
    fact: {
      background: '#4f4f4f',
    },
  },
  spacing: 6,
})

export { lightTheme, darkTheme, colorBlindDark, colorBlindLight }

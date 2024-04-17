import VisualGedcomxDiffer from './gx-differ/VisualGedcomxDiffer'
import {
  Button,
  CssBaseline,
  Stack,
  ThemeProvider,
  Toolbar,
} from '@mui/material'
import { useState } from 'react'
import { colorBlindDark, colorBlindLight, darkTheme, lightTheme } from './Theme'

export default function DifferApp() {
  const [theme, setTheme] = useState(lightTheme)
  const [colorblind, setColorblind] = useState(false)

  const handleThemeChange = () => {
    if (colorblind) {
      const newTheme =
        theme === colorBlindLight ? colorBlindDark : colorBlindLight
      setTheme(newTheme)
    } else {
      const newTheme = theme === lightTheme ? darkTheme : lightTheme
      setTheme(newTheme)
    }
  }

  const handleColorblindChange = () => {
    let newColorblindState = !colorblind
    setColorblind(newColorblindState)
    if (newColorblindState) {
      const newTheme = theme === lightTheme ? colorBlindLight : colorBlindDark
      setTheme(newTheme)
    } else {
      const newTheme = theme === colorBlindLight ? lightTheme : darkTheme
      setTheme(newTheme)
    }
  }

  const themeIsLight = theme === lightTheme || theme === colorBlindLight

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toolbar>
        <Stack
          direction={'row'}
          spacing={4}
          width={'100%'}
          justifyContent={'flex-end'}
        >
          <Button
            onClick={handleThemeChange}
            variant={'outlined'}
            color={themeIsLight ? 'primary' : 'info'}
          >
            Using {themeIsLight ? 'Light' : 'Dark'} Theme
          </Button>
          <Button
            onClick={handleColorblindChange}
            variant={'outlined'}
            color={colorblind ? 'warning' : 'info'}
          >
            Using {colorblind ? 'Accessible' : 'Standard'} Colors
          </Button>
        </Stack>
      </Toolbar>
      <VisualGedcomxDiffer />
    </ThemeProvider>
  )
}

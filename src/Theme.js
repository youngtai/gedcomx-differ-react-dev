import { extendTheme } from "@mui/joy/styles";

const commonLightPalette = {
  fact: {
    softBg: "#eeeeee",
  },
};

const commonDarkPalette = {
  fact: {
    softBg: "#4f4f4f",
  },
};

const themes = {
  standard: extendTheme({
    cssVarPrefix: 'mode-toggle',
    colorSchemeSelector: '.demo_mode-toggle-%s',
    colorSchemes: {
      light: {
        palette: {
          ...commonLightPalette,
          diff: {
            background: "#fff6f6",
            color: "#e50000",
          },
        },
      },
      dark: {
        palette: {
          ...commonDarkPalette,
          diff: {
            background: "#230000",
            color: "#ffbebe",
          },
        },
      },
    },
    spacing: 6,
  }),

  colorBlind: extendTheme({
    cssVarPrefix: 'mode-toggle',
    colorSchemeSelector: '.demo_mode-toggle-%s',
    colorSchemes: {
      light: {
        palette: {
          ...commonLightPalette,
          diff: {
            background: "#fff1c8",
            color: "#0C7BDC",
          },
        },
      },
      dark: {
        palette: {
          ...commonDarkPalette,
          diff: {
            background: "#4d3600",
            color: "#5eb3fa",
          },
        },
      },
    },
    spacing: 6,
  }),
};

export const { standard, colorBlind } =
  themes;

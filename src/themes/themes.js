const themes = [
  {
    name: 'roseGarden',
    theme: {
      typography: {
        fontFamily: 'Roboto',
      },
      palette: {
        mode: 'light',
        primary: {
          main: '#FA7070',
        },
        secondary: {
          main: '#98FB98',
        },
        background: {
          default: '#F6F5F5', // Light background color
          customBackground: '#fbe3e8', // Gradient background color
        },
      },
    },
  },
  {
    name: 'royalMajesty',
    theme: {
      typography: {
        fontFamily: 'Verdana, sans-serif',
      },
      palette: {
        mode: 'light',
        primary: {
          main: '#973131',
        },
        secondary: {
          main: '#FFD700',
        },
        background: {
          default: '#F9E2AF', // Light background color
          customBackground: '#e1b382', // Dark background color
        },
      },
    },
  },
  {
    name: 'forestWhisper',
    theme: {
      typography: {
        fontFamily: 'Georgia, serif',
      },
      palette: {
        mode: 'light',
        primary: {
          main: '#365E32',
        },
        secondary: {
          main: '#8FBC8F',
        },
        background: {
          default: '#E7D37F', // Light background color
          customBackground: '#c9af98', // Dark background color
        },
      },
    },
  },
  {
    name: 'sunsetGlow',
    theme: {
      typography: {
        fontFamily: 'Times New Roman, serif',
      },
      palette: {
        mode: 'light',
        primary: {
          main: '#DC5F00',
        },
        secondary: {
          main: '#6A5ACD',
        },
        background: {
          default: '#FFEC9E', // Light background color
          customBackground: '#ffde22', // Dark background color
        },
      },
    },
  },
  {
    name: 'sereneSky',
    theme: {
      typography: {
        fontFamily: 'Courier New, monospace',
      },
      palette: {
        mode: 'light',
        primary: {
          main: '#F39C12',
        },
        secondary: {
          main: '#F0F8FF',
        },
        background: {
          default: '#F1EF99', // Light background color
          customBackground: '#F39C12', // Dark background color
        },
      },
    },
  },
  {
    name: 'darkTheme',
    theme: {
      typography: {
        fontFamily: 'Arial, sans-serif',

      },
      palette: {
        mode: 'dark',
        primary: {
          main: '#2F4F4F',
        },
        secondary: {
          main: '#FFF3CF',
        },
        background: {
          default: '#1F2544', // Dark background color
          customBackground: '#111', // Dark background color
        },
      },
      overrides: {
        MuiTypography: {
          root: {
            color: 'white',
          },
        },
      },
    },
  },
];
export default themes;

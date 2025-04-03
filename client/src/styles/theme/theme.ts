import { createTheme } from "@mui/material/styles";

export const themeUtils = () => {
  return createTheme({
    palette: {
      mode: "light", // Světlý režim
      primary: {
        main: "#5A4BAD", // Tmavší fialová 
        light: "#7F6BDE", // Světlejší fialová
        dark: "#3D3081", // Tmavší fialová pro hover a akcenty
      },
      secondary: {
        main: "#FDA24F", // Zlatá pro sekundární akcenty
        light: "#FFB766", // Světlejší zlatá
        dark: "#D68239", // Tmavší zlatá
      },
      background: {
        default: "#FFFFFF", // Bílé pozadí pro celé tělo aplikace
        paper: "#F4F4F5", // Jemně šedé pozadí pro komponenty
      },
      text: {
        primary: "#222222", // Tmavý text pro lepší čitelnost
        secondary: "#555555", // Méně kontrastní text pro menší části
      },
    },
    typography: {
      fontFamily: '"Righteous", sans-serif', // Font pro text
      h3: {
        fontWeight: 600,
        fontSize: "1.5rem",
      },
      body1: {
        fontWeight: 400,
        fontSize: "1rem",
      },
    },
    // components: {
    //   MuiButton: {
    //     styleOverrides: {
    //       root: {
    //         backgroundColor: "#5A4BAD", // Tmavší fialová pro tlačítka
    //         "&:hover": {
    //           backgroundColor: "#3D3081", // Tmavší fialová pro hover
    //         },
    //       },
    //     },
    //   },
    // },
  });
};

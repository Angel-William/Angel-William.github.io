// Define a type for the theme object
type Theme = {
    bg: string;
    bgLight: string;
    primary: string;
    text_primary: string;
    text_secondary: string;
    card: string;
    card_light?: string; // Optional property since it's only in darkTheme
    button: string;
    white?: string; // Optional property since it's only in darkTheme
    black?: string; // Optional property since it's only in darkTheme
  };
  
  // Define dark theme with type safety
  export const darkTheme: Theme = {
    bg: "#1C1C27",
    bgLight: "#1C1E27",
    primary: "#854CE6",
    text_primary: "#F2F3F4",
    text_secondary: "#b1b2b3",
    card: "#171721",
    card_light: "#191924",
    button: "#854CE6",
    white: "#FFFFFF",
    black: "#000000",
  };
  
  // Define light theme with type safety
  export const lightTheme: Theme = {
    bg: "#FFFFFF",
    bgLight: "#f0f0f0",
    primary: "#be1adb",
    text_primary: "#111111",
    text_secondary: "#48494a",
    card: "#FFFFFF",
    button: "#5c5b5b",
  };
  
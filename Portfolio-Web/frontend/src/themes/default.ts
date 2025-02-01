// Define types for the theme structure
type Fonts = {
  title: string;
  main: string;
};

type Colors = {
  primary1: string;
  background1: string;
  button: string;
  background2: string;
  text: string;
  text1: string;
  text2: string;
  text3: string;
  footerBackground: string;
};

type Breakpoints = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

type Theme = {
  fonts: Fonts;
  colors: Colors;
  breakpoints: Breakpoints;
};

// Export the default theme with type safety
const theme: Theme = {
  // Temp fonts
  fonts: {
    title: "Space Grotesk, sans-serif",
    main: "Space Grotesk, sans-serif",
  },
  // Colors for layout
  colors: {
    primary1: "#854CE6",
    background1: "#222A35",
    button: "#854CE6",
    background2: "#19212C",
    text: "#C8CFD8",
    text1: "#F2F5F7",
    text2: "#626970",
    text3: "#575C66",
    footerBackground: "#00012B",
  },
  // Breakpoints for responsive design
  breakpoints: {
    sm: "screen and (max-width: 640px)",
    md: "screen and (max-width: 768px)",
    lg: "screen and (max-width: 1024px)",
    xl: "screen and (max-width: 1280px)",
  },
};

export default theme;

import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";

export const ColorModeContext = React.createContext({
  mode: "light",
  setMode: (mode: "light" | "dark") => {},
});

const ColorModeContextProvider: React.FC = ({ children }) => {
  const [mode, setMode] = React.useState<"light" | "dark">(() => {
    if (
      localStorage.getItem("theme") === null ||
      localStorage.getItem("theme") === "light"
    ) {
      return "light";
    } else if (localStorage.getItem("theme") === "dark") {
      return "dark";
    } else {
      return "light";
    }
  });

  const contextValue = React.useMemo(() => ({ mode, setMode }), [mode]);

  const value = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                primary: {
                  main: "#2f343d",
                  contrastText: "#000000",
                },
                secondary: {
                  main: "#bac0ce",
                  contrastText: "#161c26",
                },
                background: {
                  default: "#161c26",
                  paper: "#2f343d",
                },
              }
            : {
                primary: {
                  main: "#0071EB",
                  contrastText: "#000000",
                },
                secondary: {
                  main: "#efefef",
                  contrastText: "#000000",
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={value}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeContextProvider;

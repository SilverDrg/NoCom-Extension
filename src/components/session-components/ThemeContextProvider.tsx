import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

export const ColorModeContext = React.createContext({ 
    mode: 'light',
    setMode: (mode: 'light' | 'dark') => {}
});

const ColorModeContextProvider: React.FC = ({ children }) => {
    const [mode, setMode] = React.useState<'light' | 'dark'>(() => {
        if(localStorage.getItem('theme') === null || localStorage.getItem('theme') === 'light') {
            return 'light';
        } else if (localStorage.getItem('theme') === 'dark') {
            return 'dark';
        } else {
            return 'light';
        }
    });

    const contextValue = React.useMemo(() => ({mode, setMode}),[mode])

    const value = React.useMemo(() => createTheme({
        palette: {
        mode,
            ...(mode === 'dark' ? {
            primary: {
                light: '#c8ffff',
                main: '#94eeff',
                dark: '#60bbcc',
                contrastText: '#000000',
            },
            secondary: {
                light: '#6b6f77',
                main: '#40444b',
                dark: '#202225',
                contrastText: '#ffffff',
            },
            background: {
                default: '#2f3136',
                paper: '#2f3136'
            }
        } : {
            primary: {
            light: '#c8ffff',
            main: '#94eeff',
            dark: '#60bbcc',
            contrastText: '#000000',
            },
            secondary: {
            light: '#ffffff',
            main: '#efefef',
            dark: '#bdbdbd',
            contrastText: '#000000',
            },
        }),
        },
    }),
    [mode]
    );

    return <ColorModeContext.Provider value={contextValue}><ThemeProvider theme={value}>{children}</ThemeProvider></ColorModeContext.Provider>
}

export default ColorModeContextProvider;
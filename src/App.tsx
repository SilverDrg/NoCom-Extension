import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Title, Navigation, Footer, Home, AboutUs } from "./components";
import { SignIn, SignUp, ForgotPassword } from "./components";
import { Comments } from "./components";
import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const darkTheme = createTheme({
  palette: {
    primary: {
      light: '#c8ffff',
      main: '#94eeff',
      dark: '#60bbcc',
      contrastText: '#000000',
    },
    secondary: {
      light: '#6b6f77',
      main: '#40444b',
      dark: '#191d23',
      contrastText: '#ffffff',
    },
  },
});

const lightTheme = createTheme({
  palette: {
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
  },
});

const App: React.FC = () => {
  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <Title />
        <Router>
        <Navigation />
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path='/home' element={ <Home /> }/>
            <Route path='/comments' element={ <Comments /> }/>
            <Route path='/about-us' element={ <AboutUs /> }/>
            <Route path='/sign-in' element={ <SignIn /> }/>
            <Route path='/sign-up' element={ <SignUp /> }/>
            <Route path='/forgot-pass' element={ <ForgotPassword /> }/>
          </Routes>
        </Router>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;

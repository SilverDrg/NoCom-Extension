import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Title, Navigation, Footer, Home, AboutUs, TokenContextProvider, ThemeContextProvider } from "./components";
import { SignIn, SignUp, ForgotPassword, Profile, Settings } from "./components";
import { Comments, CommentNew, CommentNewButton } from "./components";
import { CssBaseline, Box } from '@mui/material';
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

const App: React.FC = () => {  
  return (
    <TokenContextProvider>
      <div className="App">
        <ThemeContextProvider>
        <CssBaseline/>
          <Box
            sx={{
              backgroundColor: 'background.default',
              color: 'text.primary'
            }}
          >
            <Title />
            <Router>
            <Navigation />
              <Routes>
                <Route path="/" element={<Navigate replace to="/home" />} />
                <Route path='/home' element={ <Home /> }/>
                <Route path='/about-us' element={ <AboutUs /> }/>

                <Route path='/comments' element={ <Comments /> }/>
                <Route path='/comment-new' element={ <CommentNew /> }/>

                <Route path='/profile' element={ <Profile /> }/>
                <Route path='/settings' element={ <Settings /> }/>

                <Route path='/sign-in' element={ <SignIn /> }/>
                <Route path='/sign-up' element={ <SignUp /> }/>
                <Route path='/forgot-pass' element={ <ForgotPassword /> }/>
              </Routes>
              <Footer />
            <CommentNewButton />
            </Router>
          </Box>
        </ThemeContextProvider>
      </div>
    </TokenContextProvider>
  );
}

export default App;

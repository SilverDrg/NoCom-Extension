import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, Box } from '@mui/material';
import TokenContextProvider from './components/session/TokenContextProvider';
import { Title, Navigation, Home, Settings } from '@mui/icons-material';
import { CommentNew } from './components/comment/CommentNew';
import { CommentNewButton } from './components/comment/CommentNewButton';
import { Comments } from './components/comment/Comments';
import { AboutUs } from './components/general/AboutUs';
import { Footer } from './components/general/Footer';
import ThemeContextProvider from './components/session/ThemeContextProvider';
import { ForgotPassword } from './components/user/ForgotPassword';
import { Profile } from './components/user/Profile';
import { SignIn } from './components/user/SignIn';
import { SignUp } from './components/user/SignUp';

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
          <CssBaseline />
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
                <Route path='/home' element={<Home />} />
                <Route path='/about-us' element={<AboutUs />} />

                <Route path='/comments' element={<Comments />} />
                <Route path='/comment-new' element={<CommentNew />} />

                <Route path='/profile' element={<Profile />} />
                <Route path='/settings' element={<Settings />} />

                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/forgot-pass' element={<ForgotPassword />} />
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

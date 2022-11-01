import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, Box } from '@mui/material';
import TokenContextProvider from './components/session/TokenContextProvider';
import ThemeContextProvider from './components/session/ThemeContextProvider';
import { Title } from './components/general/Title';
import { Home } from './components/general/Home';
import { AboutUs } from './components/general/AboutUs';
import { Navigation } from './components/general/Navigation';
import { Footer } from './components/general/Footer';

import { CommentNew } from './components/comment/CommentNew';
import { CommentNewButton } from './components/comment/CommentNewButton';
import { Comments } from './components/comment/Comments';

import { ForgotPassword } from './components/user/ForgotPassword';
import { Profile } from './components/user/Profile';
import { Settings } from './components/user/Settings';
import { SignIn } from './components/user/SignIn';
import { SignUp } from './components/user/SignUp';

import './App.css';

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

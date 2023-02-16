import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CssBaseline, Box } from '@mui/material';
import TokenContextProvider from './components/session/TokenContextProvider';
import ThemeContextProvider from './components/session/ThemeContextProvider';
import { Title } from './components/general/Title';
import { Home } from './components/general/Home';
import { Navigation } from './components/general/Navigation';
import { Footer } from './components/general/Footer';
import { PrivateRoute } from './components/general/PrivateRoute';

import { CommentNew } from './components/comment/CommentNew';
import { CommentNewButton } from './components/comment/CommentNewButton';
import { Comments } from './components/comment/Comments';
import { CommentDisplay } from './components/comment/CommentDisplay';

import { ForgotPassword } from './components/user/ForgotPassword';
import { Profile } from './components/user/Profile';
import { Settings } from './components/user/Settings';
import { SignIn } from './components/user/SignIn';
import { SignUp } from './components/user/SignUp';

import { useUserId } from './hooks/useUserId';
import './App.css';

const App: React.FC = () => {
  const [userId] = useUserId();
  return (
    <HelmetProvider>
      <TokenContextProvider>
        <div className="App">
          <ThemeContextProvider>
            <CssBaseline />
            <Box
              sx={{
                backgroundColor: 'background.default',
                color: 'text.primary',
              }}
            >
              <Title />
              <Router>
                <Navigation />
                <Routes>
                  <Route path="/" element={<Navigate replace to="/comments" />} />
                  <Route path="*" element={<Navigate replace to="/comments" />} />

                  <Route path="/home" element={<Home />} />

                  <Route path="/comments" element={<Comments />} />
                  <Route path="/comments/:id" element={<CommentDisplay />} />

                  <Route element={<PrivateRoute />}>
                    <Route path="/comment-new" element={<CommentNew />} />

                    <Route path="/profile" element={<Profile userId={userId} />} />
                    <Route path="/settings" element={<Settings />} />
                  </Route>

                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/forgot-pass" element={<ForgotPassword />} />
                </Routes>
                <Footer />
                <CommentNewButton />
              </Router>
            </Box>
          </ThemeContextProvider>
        </div>
      </TokenContextProvider>
    </HelmetProvider>
  );
};

export default App;

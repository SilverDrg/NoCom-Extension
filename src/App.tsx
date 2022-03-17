import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navigation, Footer, Home, AboutUs } from "./components";
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navigation />
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about-us' element={<AboutUs />}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;

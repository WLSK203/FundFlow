import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Homepage from './pages/Homepage';
import SearchResults from './pages/SearchResults';
import Organizations from './pages/Organizations';
import OrganizationDetail from './pages/OrganizationDetail';
import AuthPage from './pages/AuthPage';

import Partnership from './pages/Partnership';
import About from './pages/About';
import FundTrackerPage from './pages/FundTrackerPage';
import FundIdTracker from './pages/FundIdTracker';

import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/organization/:id" element={<OrganizationDetail />} />
            <Route path="/fund/:fundId" element={<FundTrackerPage />} />
            <Route path="/track" element={<FundIdTracker />} />

            <Route path="/partnership" element={<Partnership />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

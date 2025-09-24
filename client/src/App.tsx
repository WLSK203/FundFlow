import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Homepage from './pages/Homepage';
import SearchResults from './pages/SearchResults';
import Organizations from './pages/Organizations';
import OrganizationDetail from './pages/OrganizationDetail';
import Team from './pages/Team';
import Partnership from './pages/Partnership';
import About from './pages/About';
import FundTrackerPage from './pages/FundTrackerPage';
import FundIdTracker from './pages/FundIdTracker';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/organization/:id" element={<OrganizationDetail />} />
          <Route path="/fund/:fundId" element={<FundTrackerPage />} />
          <Route path="/track" element={<FundIdTracker />} />
          <Route path="/team" element={<Team />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

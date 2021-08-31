import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MealSites from './MealSites';

function App() {
  return (
    <Router>
      {/* :view will be either "map" or "print", asterisk manages all filter params */}
      <Route path="/:view*" component={MealSites} />
    </Router>
  );
}

export default App;

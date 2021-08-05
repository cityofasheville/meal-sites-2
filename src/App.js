import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar';
import MealSites from './MealSites';

function App() {
  return (
    <Router>
      <Route path="/" component={NavBar} />
      {/* <Route exact path="/" component={Banner} /> */}
      {/* <Route path="/" component={MealSites} /> */}
      <Route path="/:view*" component={MealSites} />
    </Router>
  );
}

export default App;

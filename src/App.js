import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Banner from './Banner';
import Locations from './Locations';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Banner} />
        <Route path="/" component={Locations} />
      </div>
    </Router>
  );
}

export default App;

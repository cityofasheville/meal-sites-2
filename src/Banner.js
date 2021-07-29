import React, { Component } from 'react';
// import './NavBar.css';
import {Link} from 'react-router-dom';

class Banner extends Component {
  render() {

    let navColor = 'transparent';
    if ( this.props.location.pathname !== '/') {
      navColor = 'black';
    }

    return(
      <div className="container-fluid px-0">
        <header title="Buncombe County Area Meal Sites" class="jumbotron jumbotron-fluid no-print">
          <div class="container position-relative">
            <div class="jumbotron--text">
              <h1 class="text-black">Buncombe County Area Meal Sites</h1>
              <p class="lead text-black sub-heading">
                Find locations around Buncombe County working hard to feed our community. 
              </p>
              <p class="lead text-black sub-heading">
                <strong>FOR STUDENTS:</strong> text FOODNC to 877-877 to locate nearby free meal sites. 
                The texting service is also available in Spanish by texting COMIDA to 877-877.
              </p>    
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Banner;
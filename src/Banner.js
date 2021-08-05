import React from 'react';
import { Link } from 'react-router-dom';

function Banner(props) {

  let currentUrlParams = new URLSearchParams(window.location.search);

  return(
    <div className="h-100 container-fluid p-0 m-0 home-cover">
      {/* <header title="Buncombe County Area Meal Sites" className="jumbotron jumbotron-fluid no-print"> */}
        <div className="h-100 container position-relative">
          <div className="jumbotron--text">
            <h1 className="text-black">Buncombe County Area Meal Sites</h1>
            <p className="lead text-black sub-heading">
              Find locations around Buncombe County working hard to feed our community. 
            </p>
            <p className="lead text-black sub-heading">
              <strong>FOR STUDENTS:</strong> text FOODNC to 877-877 to locate nearby free meal sites. 
              The texting service is also available in Spanish by texting COMIDA to 877-877.
            </p>   
            <h2 className="text-black mb-3">View Options</h2>
            <div className="btn-group d-flex" role="group" aria-label="View locations on a map.">
              <Link className="btn btn-outline-dark" to={`/map/?${currentUrlParams}`}><i class="fa fa-map-o nav-link-icon" aria-hidden="true"></i>Map</Link>
              <Link className="btn btn-outline-dark ml-2" to={`/cards/?${currentUrlParams}`}><i class="fa fa-list-alt nav-link-icon" aria-hidden="true"></i>Cards</Link>
              <Link className="btn btn-outline-dark ml-2 nav-print-option" to={`/print/?${currentUrlParams}`}><i class="fa fa-print nav-link-icon" aria-hidden="true"></i>Print</Link>
            </div>
          </div>

        </div>
      {/* </header> */}
    </div>
  );
}

export default Banner;
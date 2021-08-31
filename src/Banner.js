import React from 'react';
import { Link } from 'react-router-dom';

function Banner(props) {

  let currentUrlParams = new URLSearchParams(window.location.search);

  return(
    <div className="h-100 container-fluid p-0 m-0 home-cover">
      <div className="h-100 container position-relative">
        <div className="jumbotron--text">
          <h2 className="text-black">Buncombe County Food Resources</h2>
          <p className="lead text-black sub-heading">
            Find locations around Buncombe County working hard to feed our community. 
          </p>
          <p className="lead text-black sub-heading">
            <strong>FOR STUDENTS:</strong> text FOODNC to 877-877 to locate nearby free meal sites. 
            The texting service is also available in Spanish by texting COMIDA to 877-877.
          </p>   
          <h3 className="text-black mb-4">View Options</h3>
          <div className="btn-group d-flex" role="group" aria-label="View locations on a map.">
            <Link className="btn btn-outline-dark mx-3" to={`/map/?${currentUrlParams}`}><i className="fa fa-map-o nav-link-icon" aria-hidden="true"></i>Map View</Link>
            <Link className="btn btn-outline-dark ml-2 nav-print-option mx-3" to={`/print/?${currentUrlParams}`}><i className="fa fa-print nav-link-icon" aria-hidden="true"></i>Print View</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Banner;
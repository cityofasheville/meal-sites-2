import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar(props) {

  let currentUrlParams = new URLSearchParams(window.location.search);

  // Filter selections don't work right in IE
  // IE users will get a full list of locations, a map with markers, and a link to browsehappy.com
  let symptomsOfInternetExplorer = /MSIE|Trident/.test(window.navigator.userAgent);

  return(
    <nav className="navbar navbar-expand navbar-dark bg-coa-blue site-masthead">
      <div className="container-fluid">
        <div className="navbar-brand nav-link-home">
          <h1 className="font-weight-light site-heading">
            <i className="fas fa-map-marked-alt mx-3" title="Asheville Food Resources" aria-hidden="true"></i>
            <span className="d-sm-inline-block">Food Resource Map</span>
          </h1>
        </div>
        <div className="collapse navbar-collapse flex-row-reverse flex-lg-row" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {symptomsOfInternetExplorer &&
              <p className="m-0 border ms-3">                
                <a className="nav-link mx-4 active" href="https://browsehappy.com/" target="_blank" rel="noopener noreferrer"><i className="fas fa-exclamation-triangle nav-link-icon" aria-hidden="true"></i> For a better online experience, try a modern web browser</a>
              </p>
            }
            {(window.location.pathname !== '/' && !symptomsOfInternetExplorer) &&
              <button 
                type="button" 
                className="btn btn-link nav-link ms-4 active button-filter__trigger"
                aria-haspopup="true" 
                aria-controls="filtersModal" 
                data-bs-toggle="modal" 
                data-bs-target="#filtersModal">
                <i className="fa fa-filter nav-link-icon" aria-hidden="true"></i>Filter Results
              </button>    
            }
            {(window.location.pathname.startsWith('/print/') && !symptomsOfInternetExplorer) &&
              <NavLink 
                className="nav-link mx-4 active" 
                to={`/map/?${currentUrlParams}`}>
                  <i className="fa fa-map-o nav-link-icon" aria-hidden="true"></i>Map View
              </NavLink>
            }
            {(window.location.pathname.startsWith('/map/') && !symptomsOfInternetExplorer) && 
              <NavLink 
                className="nav-link mx-4 d-none d-lg-inline-block active" 
                to={`/print/?${currentUrlParams}`}>
                  <i className="fa fa-print nav-link-icon" aria-hidden="true"></i>Print View
              </NavLink>
            }
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
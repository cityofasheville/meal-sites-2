import { NavLink } from 'react-router-dom';

function NavBar(props) {

  let currentUrlParams = new URLSearchParams(window.location.search);
  console.log(`Router L0cation +${window.location.pathname}+`);

  return(
    <nav className="navbar navbar-expand navbar-dark bg-coa-blue">
      <div className="container-fluid">
        <div className="navbar-brand nav-link-home">
          <i className="fas fa-map-marked-alt me-3 font-weight-light" title="Asheville Food Resources"></i>
          <span className="d-none d-md-inline-block font-weight-light">Food Resource Map</span>
        </div>
        <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {window.location.pathname !== '/' &&
              <button type="button" className="btn btn-link nav-link ms-4 active button-filter__trigger" data-bs-toggle="modal" data-bs-target="#filtersModal">
                <i className="fa fa-filter nav-link-icon" aria-hidden="true"></i>Filter Results
              </button>            
            }
            {window.location.pathname.startsWith('/print/') &&
              <NavLink 
                className="nav-link mx-4 active" 
                to={`/map/?${currentUrlParams}`}>
                  <i className="fa fa-map-o nav-link-icon" aria-hidden="true"></i>Map View
              </NavLink>
            }
            {window.location.pathname.startsWith('/map/') && 
              <NavLink 
                className="nav-link mx-4 nav-print-option active" 
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
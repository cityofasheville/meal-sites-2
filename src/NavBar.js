import { NavLink } from 'react-router-dom';

function NavBar(props) {

  let currentUrlParams = new URLSearchParams(window.location.search);

  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-coa-blue">
      <div className="container-fluid">
        <NavLink className="navbar-brand nav-link-home" exact activeClassName="active" to={`/`}>Meal Sites</NavLink>
        {/* <a className="navbar-brand" href="#"></a> */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link mx-3" activeClassName="active" to={`/map/?${currentUrlParams}`}><i class="fa fa-map-o nav-link-icon" aria-hidden="true"></i>Map</NavLink>
            <NavLink className="nav-link mx-3" activeClassName="active" to={`/cards/?${currentUrlParams}`}><i class="fa fa-list-alt nav-link-icon" aria-hidden="true"></i>Cards</NavLink>
            <NavLink className="nav-link mx-3 nav-print-option" activeClassName="active" to={`/print/?${currentUrlParams}`}><i class="fa fa-print nav-link-icon" aria-hidden="true"></i>Print</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
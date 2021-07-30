import React from 'react';

function Banner() {
  return(
    <div className="container-fluid px-0">
      <header title="Buncombe County Area Meal Sites" className="jumbotron jumbotron-fluid no-print">
        <div className="container position-relative">
          <div className="jumbotron--text">
            <h1 className="text-black">Buncombe County Area Meal Sites</h1>
            <p className="lead text-black sub-heading">
              Find locations around Buncombe County working hard to feed our community. 
            </p>
            <p className="lead text-black sub-heading">
              <strong>FOR STUDENTS:</strong> text FOODNC to 877-877 to locate nearby free meal sites. 
              The texting service is also available in Spanish by texting COMIDA to 877-877.
            </p>    
          </div>
        </div>
      </header>
    </div>
  );
}

export default Banner;
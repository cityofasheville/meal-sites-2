import React from 'react';
import LocationStrip from './LocationStrip';

function PrintLayout(props) {

  let filteredLocationsSetSize = props.filteredLocations.length;

  let locationStrips = props.filteredLocations.map( (location, i) => {
    return (
      <LocationStrip key={i} location={location} posInSet={i+1} setSize={filteredLocationsSetSize}  />
    )
  })
  
  return(
    <main title="List of Asheville Meal Sites - Printable Layout" className="container-fluid mt-5 js-dependent print-view">
      <table id="food-locations-print" width="100%" className="table table-bordered">
        <caption>List of Asheville Food Resources - Printable Layout</caption>
        <thead>
          <tr>
            <th className="px-3 print-name-column fs-3" scope="col">Location and Service</th>
            <th className="px-3 print-days-column fs-3" scope="col">Schedule</th>
            <th className="px-3 print-location-column fs-3" scope="col">Location</th>
          </tr>

          {(props.filteredLocations.length === 0) &&
            <tr>
              <td colSpan='3'>No results found</td>
            </tr>          
          }

          {(props.filteredLocations.length > 0) && locationStrips}

        </thead>
      </table>
    </main>
  );
}

export default PrintLayout;
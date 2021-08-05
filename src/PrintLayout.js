import React from 'react';
import LocationStrip from './LocationStrip';

function PrintLayout(props) {

  let locationStrips = props.filteredLocations.map( (location, i) => {
    return (
      <LocationStrip key={i} location={location} />
    )
  })
  
  return(
    <main title="List of Asheville Meal Sites - Printable Layout" className="container-fluid mt-5 js-dependent print-view">
      <table id="food-locations-print" width="100%" className="table-print">
        <caption>List of Asheville Meal Sites - Printable Layout</caption>
        <thead>
          <tr>
            <th scope="col">Location and Service</th>
            <th scope="col">Schedule</th>
            <th scope="col">Location</th>
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
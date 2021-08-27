import React from 'react';

function LocationCard(props) {



  let q = encodeURIComponent(props.location.address);
  let iconClass = props.location.serviceIcon;
  // let cardMapClass = '';
  // let q = encodeURIComponent(`${props.location.wgs_y},${props.location.wgs_x}`);

  if (props.context === 'map') {
    iconClass += ' service-icon-map';
    // cardMapClass += ' card-map';
  }

  return(
    <tr className={`all-objects object-${props.location.OBJECTID} ${props.location.selectors}`}>
      <td className="px-3"><h3>{props.location.name}</h3><i className={`${iconClass} icon-print`} aria-hidden="true"></i> {props.location.type === 'Students' ? 'Student Meals' : props.location.type}</td>
      <td className="px-3">
        <ul className="week-list week-list--print" aria-label="Days of the week">
          <li className={`day-of-week ${props.location.styleM}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleM === 'day-of-week--on' ? 'open' : 'closed'} on Monday`}><span className="day-label">M</span></li>
          <li className={`day-of-week ${props.location.styleT}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleT === 'day-of-week--on' ? 'open' : 'closed'} on Tuesday`}><span className="day-label">T</span></li>
          <li className={`day-of-week ${props.location.styleW}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleW === 'day-of-week--on' ? 'open' : 'closed'} on Wednesday`}><span className="day-label">W</span></li>
          <li className={`day-of-week ${props.location.styleTh}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleTh === 'day-of-week--on' ? 'open' : 'closed'} on Thursday`}><span className="day-label">Th</span></li>
          <li className={`day-of-week ${props.location.styleF}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleF === 'day-of-week--on' ? 'open' : 'closed'} on Friday`}><span className="day-label">F</span></li>
          <li className={`day-of-week ${props.location.styleSa}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleSa === 'day-of-week--on' ? 'open' : 'closed'} on Saturday`}><span className="day-label">Sa</span></li>
          <li className={`day-of-week ${props.location.styleSu}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleSu === 'day-of-week--on' ? 'open' : 'closed'} on Sunday`}><span className="day-label">Su</span></li>
        </ul>
        {props.location.hoursOpen} | {props.location.daysOpen}
      </td>
      <td className="px-3">Area: {props.location.generalArea}<br /><a className="map-link text-dark" href={`https://www.google.com/maps/search/${q}`} title={`View location of ${props.location.name} on a Google Map in a new browser tab`} target="_blank" rel="noopener noreferrer">Location</a>: {props.location.address}</td>
    </tr>
  )
}

export default LocationCard;
import React from 'react';

function LocationCard(props) {

  let q = encodeURIComponent(props.location.address);
  let iconClass = props.location.serviceIcon;
  let cardMapClass = ' mb-5';

  if (props.context === 'map') {
    iconClass += ' service-icon-map';
    cardMapClass = ' location-card-popup';
  }

  return(
    <article aria-posinset={props.posInSet} aria-setsize={props.setSize} className={` all-objects object-${props.location.OBJECTID} ${props.location.selectors} ${cardMapClass}`}>
      <div className="card inner m-3 h-100">
        <header className="card-header"><h3 className="my-2">{props.location.name}</h3></header>
        <ul className="list-group list-group-flush">
          {
            (props.context !== 'map') && 
            <li className="list-group-item">{props.location.generalArea}</li>
          }
          <li className="list-group-item"><i className={iconClass} aria-hidden="true"></i> {props.location.type === 'Students' ? 'Student Meals' : props.location.type}</li>
          <li className="list-group-item">
            <ul className="week-list" aria-label="Days of the week">
              <li className={`day-of-week ${props.location.styleM}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleM === 'day-of-week--on' ? 'open' : 'closed'} on Monday`}><span className="day-label">M</span></li>
              <li className={`day-of-week ${props.location.styleT}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleT === 'day-of-week--on' ? 'open' : 'closed'} on Tuesday`}><span className="day-label">T</span></li>
              <li className={`day-of-week ${props.location.styleW}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleW === 'day-of-week--on' ? 'open' : 'closed'} on Wednesday`}><span className="day-label">W</span></li>
              <li className={`day-of-week ${props.location.styleTh}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleTh === 'day-of-week--on' ? 'open' : 'closed'} on Thursday`}><span className="day-label">Th</span></li>
              <li className={`day-of-week ${props.location.styleF}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleF === 'day-of-week--on' ? 'open' : 'closed'} on Friday`}><span className="day-label">F</span></li>
              <li className={`day-of-week ${props.location.styleSa}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleSa === 'day-of-week--on' ? 'open' : 'closed'} on Saturday`}><span className="day-label">Sa</span></li>
              <li className={`day-of-week ${props.location.styleSu}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleSu === 'day-of-week--on' ? 'open' : 'closed'} on Sunday`}><span className="day-label">Su</span></li>
            </ul>
          </li>          
          <li className="list-group-item">{props.location.hoursOpen}<br />{props.location.daysOpen}</li>
          <li className="list-group-item">
            <a 
              className="map-link text-dark" 
              href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} 
              title={`Get directions from your location to ${props.location.name} on a Google Map in a new browser tab`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <i className="fas fa-external-link-alt me-1" aria-hidden="true"></i>Directions</a>: {props.location.address}
          </li>
        </ul>
      </div>
    </article>
  )
}

export default LocationCard;
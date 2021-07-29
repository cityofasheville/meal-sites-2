import React from 'react';

function LocationCard(props) {

  let q = encodeURIComponent(props.location.address);

  return(
  <div class={`col p-0 mb-5 all-objects object-${props.location.OBJECTID} ${props.location.selectors}`}>
    <div class="card inner m-3 h-100">
      <div class="card-header"><h3>{props.location.name}</h3></div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">{props.location.generalArea}</li>
        <li class="list-group-item"><i class={props.location.serviceIcon}></i> {props.location.type === 'Students' ? 'Student Meals' : props.location.type}</li>
        <li class="list-group-item">
          <ul class="week-list" aria-label="Days of the week">
            <li class={`day-of-week ${props.location.styleM}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleM === 'day-of-week--on' ? 'open' : 'closed'} on Monday`}><span class="day-label">M</span></li>
            <li class={`day-of-week ${props.location.styleT}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleT === 'day-of-week--on' ? 'open' : 'closed'} on Tuesday`}><span class="day-label">T</span></li>
            <li class={`day-of-week ${props.location.styleW}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleW === 'day-of-week--on' ? 'open' : 'closed'} on Wednesday`}><span class="day-label">W</span></li>
            <li class={`day-of-week ${props.location.styleTh}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleTh === 'day-of-week--on' ? 'open' : 'closed'} on Thursday`}><span class="day-label">Th</span></li>
            <li class={`day-of-week ${props.location.styleF}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleF === 'day-of-week--on' ? 'open' : 'closed'} on Friday`}><span class="day-label">F</span></li>
            <li class={`day-of-week ${props.location.styleSa}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleSa === 'day-of-week--on' ? 'open' : 'closed'} on Saturday`}><span class="day-label">Sa</span></li>
            <li class={`day-of-week ${props.location.styleSu}`} title={`${props.location.name} ${props.location.type} service is ${props.location.styleSu === 'day-of-week--on' ? 'open' : 'closed'} on Sunday`}><span class="day-label">Su</span></li>
          </ul>
        </li>          
        <li class="list-group-item">{props.location.hoursOpen}<br />{props.location.daysOpen}</li>
        <li class="list-group-item"><a class="map-link text-dark" href={`https://www.google.com/maps/search/${q}`} title={`View location of ${props.location.name} on a Google Map`} target="_blank" rel="noopener noreferrer">Location</a>: {props.location.address}</li>
      </ul>
    </div>
  </div>

  )
}

export default LocationCard;
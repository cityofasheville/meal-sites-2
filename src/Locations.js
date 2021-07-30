import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import config from './config';
import FilterOptions from './FilterOptions';
import LocationCard from './LocationCard';

class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationListFull: [],
      locationListFiltered: [],
      activeFilters: {},
      filterOptions: {},
      filterSelectors: [],
      haveLocationData: false
    };
  }

  handleLookup = () => {
    axios.get(`${config.api_url}`)
    .then(res => {
      let newActiveFilters = {};
      let locationsInitialized = this.processRawLocations(res.data.features);

      console.log(locationsInitialized);

      let currentUrlParams = new URLSearchParams(this.props.location.search);
      let paramString = currentUrlParams.toString();
      if (paramString.length) {
        console.log('INITIAL PARAM CHECK');
        console.log(Object.keys(locationsInitialized.filterOptions));
        Object.keys(locationsInitialized.filterOptions).forEach( (filter) => {
          console.log(`Key: ${filter}`);
          console.log(currentUrlParams.getAll(filter));
          newActiveFilters[filter] = currentUrlParams.getAll(filter);
        });
      }
      this.setState({
        filterOptions: locationsInitialized.filterOptions,
        filterSelectors: locationsInitialized.filterSelectors,
        locationListFull: locationsInitialized.objectsProcessed,
        activeFilters: newActiveFilters,
        haveLocationData: true
      });
    })
    .catch(err => {
      if (err.response) {
        console.log('Unexpected response: ' + err.message);
        // client received an error response (5xx, 4xx)
      } else if (err.request) {
        console.log('Request failed: ' + err.message);
        // client never received a response, or request never left
      } else {
        console.log(err.message);
      }
    });
  }

  processRawLocations = (data) => {

    let objCount = 0;
    let cardSelectors = '';
    let typeLabel = '';
    let sanitizedValue = '';
    let todaysDate = new Date();
        todaysDate.setHours(0,0,0,0);
    let startDate;
    let endDate;
    let thisObject = {};
    let dayClassM = '';
    let dayClassT = '';
    let dayClassW = '';
    let dayClassTh = '';
    let dayClassF = '';
    let dayClassSa = '';
    let dayClassSu = '';

    // Object will contain arrays of objects representing filter options
    let filterOptions = {
      areas: {
        filterHeader: 'Located in...',
        defaultDescription: 'Any Area',
        selectLabel: 'Choose Specific Location(s):',
        data: []
      },
      days: {
        filterHeader: 'Open on...',
        defaultDescription: 'Any Day of the Week',
        selectLabel: 'Choose Specific Day(s) Open:',
        data: []
      },
      types: {
        filterHeader: 'Providing...',
        defaultDescription: 'Any Service Type',
        selectLabel: 'Choose Specific Service(s) Offered:',
        data: []
      },
    };

    let filterSelectors = [];

    let objectsProcessed = [];

    let dataToReturn = {
      filterOptions: {},
      filterSelectors: [],
      objectsProcessed: []
    };
    // let foodLocationsHTML = '';
    // let foodLocationsPrintHTML = '';

    for (let obj of data) {

    // NOTE: originally ditched foreach loop b/c we needed to break the loop on encountering empty row from spreadsheet
    // since we started pulling more reliable data, can loop however you want 

      cardSelectors = '';

      if ( obj.attributes.startDate ) {
        startDate = new Date(obj.attributes.startDate);
      } 
      else {
        startDate = new Date('3/1/2020');
      }

      if ( obj.attributes.endDate ) {
        endDate = new Date(obj.attributes.endDate);
      } 
      else {
        endDate = new Date('1/1/2100');
      }
    
      if ( (todaysDate <= endDate) && (todaysDate >= startDate) && obj.attributes.name ) {

        if (obj.attributes.generalArea) {

          sanitizedValue = 'area-' + obj.attributes.generalArea.toLowerCase().replace(/[^0-9a-z]/gi, '');
          cardSelectors += sanitizedValue + ' ';
  
          if (filterOptions.areas.data.map(function(e) { return e.value; }).indexOf(sanitizedValue) < 0) {
              filterOptions.areas.data.push(
              {
                label: obj.attributes.generalArea,
                value: sanitizedValue
              }
            );
          }
        }
  
        if (obj.attributes.type) {
  
          sanitizedValue = 'type-' + obj.attributes.type.toLowerCase().replace(/[^0-9a-z]/gi, '');
          cardSelectors += sanitizedValue + ' ';
  
          if (filterOptions.types.data.map(function(e) { return e.value; }).indexOf(sanitizedValue) < 0) {
            if (obj.attributes.type === 'Students') { 
              typeLabel = 'Student Meals' 
            } else {
              typeLabel = obj.attributes.type 
            }
            filterOptions.types.data.push(
              {
                label: typeLabel,
                value: sanitizedValue
              }
            );
          }
        }
  
        if (obj.attributes.mo) {
          cardSelectors += 'day-mo ';
          dayClassM = 'day-of-week--on';
          if (filterOptions.days.data.map(function(e) { return e.value; }).indexOf('day-mo') < 0) {
            filterOptions.days.data.push(
              {
                index: 0,
                label: 'Monday',
                value: 'day-mo'
              }
            );  
          }
        }
        else {
          dayClassM = 'day-of-week--off';
        }
  
        if (obj.attributes.tu) {
          cardSelectors += 'day-tu ';
          dayClassT = 'day-of-week--on';
          if (filterOptions.days.data.map(function(e) { return e.value; }).indexOf('day-tu') < 0) {
            filterOptions.days.data.push(
              {
                index: 1,
                label: 'Tuesday',
                value: 'day-tu'
              }
            );  
          }
        }
        else {
          dayClassT = 'day-of-week--off';
        }
  
        if (obj.attributes.we) {
          cardSelectors += 'day-we ';
          dayClassW = 'day-of-week--on';
          if (filterOptions.days.data.map(function(e) { return e.value; }).indexOf('day-we') < 0) {
            filterOptions.days.data.push(
              {
                index: 2,
                label: 'Wednesday',
                value: 'day-we'
              }
            );  
          }
        }
        else {
          dayClassW = 'day-of-week--off';
        }
  
        if (obj.attributes.th) {
          cardSelectors += 'day-th ';
          dayClassTh = 'day-of-week--on';
          if (filterOptions.days.data.map(function(e) { return e.value; }).indexOf('day-th') < 0) {
            filterOptions.days.data.push(
              {
                index: 3,
                label: 'Thursday',
                value: 'day-th'
              }
            );  
          }
        }
        else {
          dayClassTh = 'day-of-week--off';
        }
  
        if (obj.attributes.fr) {
          cardSelectors += 'day-fr ';
          dayClassF = 'day-of-week--on';
          if (filterOptions.days.data.map(function(e) { return e.value; }).indexOf('day-fr') < 0) {
            filterOptions.days.data.push(
              {
                index: 4,
                label: 'Friday',
                value: 'day-fr'
              }
            );  
          }
        }
        else {
          dayClassF = 'day-of-week--off';
        }
  
        if (obj.attributes.sa) {
          cardSelectors += 'day-sa ';
          dayClassSa = 'day-of-week--on';
          if (filterOptions.days.data.map(function(e) { return e.value; }).indexOf('day-sa') < 0) {
            filterOptions.days.data.push(
              {
                index: 5,
                label: 'Saturday',
                value: 'day-sa'
              }
            );  
          }
        }
        else {
          dayClassSa = 'day-of-week--off';
        }
  
        if (obj.attributes.su) {
          cardSelectors += 'day-su ';
          dayClassSu = 'day-of-week--on';
          if (filterOptions.days.data.map(function(e) { return e.value; }).indexOf('day-su') < 0) {
            filterOptions.days.data.push(
              {
                index: 6,
                label: 'Sunday',
                value: 'day-su'
              }
            );  
          }
        }
        else {
          dayClassSu = 'day-of-week--off';
        }

        if ( !obj.attributes.startTime && !obj.attributes.endTime ) {
          obj.attributes.hoursOpen = 'Hours not specified';
        }
        else if ( obj.attributes.startTime && !obj.attributes.endTime ) {
          obj.attributes.hoursOpen = `${obj.attributes.startTime} onward`;
        }
        else if ( !obj.startTime && obj.endTime ) {
          obj.attributes.hoursOpen = `Until ${obj.attributes.endTime}`;
        }
        else {
          obj.attributes.hoursOpen = `${obj.attributes.startTime} - ${obj.attributes.endTime}`;
        }
      
        if ( !obj.attributes.startDate && !obj.attributes.endDate ) {
          obj.daysOpen = 'Dates not specified';
        }
        else if ( (obj.attributes.startDate && !obj.attributes.endDate) || (obj.attributes.startDate && moment(todaysDate).format("YYYY") < moment(endDate).format("YYYY")) ) {
          obj.attributes.daysOpen = `${moment(startDate).format("MMM Do, YYYY")} onward`;
        }
        else if ( !obj.attributes.startDate && obj.attributes.endDate && moment(todaysDate).format("YYYY") === moment(endDate).format("YYYY") ) {
          obj.attributes.daysOpen = `Effective until ${moment(endDate).format("MMM Do, YYYY")}`;
        }
        else if ( !obj.attributes.startDate && obj.attributes.endDate && moment(todaysDate).format("YYYY") < moment(endDate).format("YYYY") ) {
          obj.attributes.daysOpen = `Ongoing`;
        }
        else {
          if ( obj.attributes.startDate === obj.attributes.endDate ) {
            obj.attributes.daysOpen = `${moment(startDate).format("MMM Do, YYYY")} Only`;
          }
          else {
            obj.attributes.daysOpen = `${moment(startDate).format("MMM Do, YYYY")} - ${moment(endDate).format("MMM Do, YYYY")}`;
          }
        }

        switch ( obj.attributes.type ) {
          case "Students":
            obj.attributes.serviceIcon = "fas fa-utensils service-student";
            break;
          case "Student Delivery Site":
            obj.attributes.serviceIcon = "fas fa-truck-loading service-delivery";
            break;
          case "Meal Pickup":
            obj.attributes.serviceIcon = "fas fa-toolbox service-meal";
            break;
          case "Food Box Pickup":
            obj.attributes.serviceIcon = "fas fa-shopping-basket service-foodbox";
            break;
          case "Farmers Market":
            obj.attributes.serviceIcon = "fas fa-tractor service-farmersmarket";
            break;
          case "Senior Meals":
            obj.attributes.serviceIcon = "fab fa-stripe-s service-seniormeals";
            break;
          case "EBT Groceries":
            obj.attributes.serviceIcon = "far fa-credit-card service-ebtgroceries";
            break;
          case "WIC Groceries":
            obj.attributes.serviceIcon = "fas fa-baby service-wicgroceries";
            break;
          case "Community Gardens":
            obj.attributes.serviceIcon = "fas fa-seedling service-communitygardens";
            break;
          default:
            obj.attributes.serviceIcon = "";
        }
        
        obj.attributes.selectors = cardSelectors;
        obj.attributes.styleM = dayClassM;
        obj.attributes.styleT = dayClassT;
        obj.attributes.styleW = dayClassW;
        obj.attributes.styleTh = dayClassTh;
        obj.attributes.styleF = dayClassF;
        obj.attributes.styleSa = dayClassSa;
        obj.attributes.styleSu = dayClassSu;
  
        thisObject = {
          objectID: obj.attributes.OBJECTID,
          selectors: cardSelectors
        };
  
        objectsProcessed.push(obj.attributes);
        filterSelectors.push(thisObject);
  
        // addCard(obj.attributes);

        objCount++;
      } else {
        // Objects will be skipped if outside date range, or if name is NULL
        // console.log(`Skipping Record - ${obj.attributes.name} - ${obj.attributes.OBJECTID}`);
      }
    }

    console.log(`-- Objects processed (${objCount}) --`);
    // console.log(filterSelectors);

    // Sort the options sensibly for display
    filterOptions.areas.data.sort( (a,b) => a.label > b.label ? 1 : -1 );
    filterOptions.types.data.sort( (a,b) => a.label > b.label ? 1 : -1 );
    filterOptions.days.data.sort( (a,b) => a.index > b.index ? 1 : -1 )

    console.log('-- Initialization Complete --');

    dataToReturn.filterOptions = filterOptions;
    dataToReturn.filterSelectors = filterSelectors;
    dataToReturn.objectsProcessed = objectsProcessed;

    return dataToReturn;
  }

  submitQueryString = (e) => {
    e.preventDefault();
    let currentUrlParams = new URLSearchParams(window.location.search);
    if (!currentUrlParams.has(e.target.dataset.filterType)) {
      currentUrlParams.set(e.target.dataset.filterType, e.target[e.target.options.selectedIndex].value);
      this.props.history.push(`?${currentUrlParams}`);
      console.log('Pushing history, component should update');
    } else {
      if (currentUrlParams.getAll(e.target.dataset.filterType).indexOf(e.target[e.target.options.selectedIndex].value) < 0) {
        currentUrlParams.append(e.target.dataset.filterType, e.target[e.target.options.selectedIndex].value);
        this.props.history.push(`?${currentUrlParams}`);
        console.log('Pushing history, component should update');
      }
    }
    let newActiveFilters = {};
    Object.keys(this.state.filterOptions).forEach( (filter) => {
      newActiveFilters[filter] = currentUrlParams.getAll(filter);
    });
    this.setState({
      activeFilters: newActiveFilters
    });
  }

  removeQueryParam = (e) => {

    let currentUrlParams = new URLSearchParams(window.location.search);

    let currentTypeParams = currentUrlParams.getAll(e.target.dataset.filterType);
    console.log(currentTypeParams);

    let remainingTypeParams = currentTypeParams.filter( (item) => {
      return (item !== e.target.dataset.filterValue);
    });

    // Deletes ALL params of a type (maybe not what we want)
    currentUrlParams.delete(e.target.dataset.filterType);

    // If there was initially more than one param of the deleted type, add them back now
    if(remainingTypeParams.length) {
      remainingTypeParams.forEach( (param) => {
        currentUrlParams.append(e.target.dataset.filterType, param);
      })
    }

    this.props.history.push(`?${currentUrlParams}`);
    console.log('Pushing history, component should update');

    let newActiveFilters = {};
    Object.keys(this.state.filterOptions).forEach( (filter) => {
      newActiveFilters[filter] = currentUrlParams.getAll(filter);
    });
    this.setState({
      activeFilters: newActiveFilters
    });
  }

  filterLocations = (location) => {

    let thisLocationPasses = true;
    let termMatches = 0;

    Object.keys(this.state.activeFilters).forEach( (key, i) => {

      if (this.state.activeFilters[key].length) {

        this.state.activeFilters[key].forEach( (term) => {
          if (location.selectors.includes(term)) {
            termMatches++;
          }
        });

        if (!termMatches) {
          thisLocationPasses = false;
        }

        termMatches = 0;
      }

    });

    return thisLocationPasses;
  }

  componentDidUpdate(prevProps) {
    console.log('DID update')
  }

  render() {

    if ( !this.state.haveLocationData) {
      console.log(`[RENDER] Fetch condition met (!this.state.haveLocationData) ${this.state.haveLocationData}`);
      this.handleLookup();
      return(
        <h1>Loading...</h1>
      );
    }

    console.log('STATE IN LOCATION RENDER:');
    console.log(this.state);

    let filteredLocations = this.state.locationListFull.filter(this.filterLocations);

    const locationGrid = filteredLocations.map( (thisLocation,i) => {
      let thisKey = `location-${i}`;
      return (
        <div key={thisKey} className="col s3 location-item">
            <LocationCard location={thisLocation} />
        </div>
      );
    });

    return(
      <main title="List of Asheville Meal Sites" className="container mt-5 js-dependent no-print">
        <FilterOptions activeFilters={this.state.activeFilters} options={this.state.filterOptions} changeHandler={this.submitQueryString} removeHandler={this.removeQueryParam} />
        <div id="food-locations" className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 p-0">
          {locationGrid}
        </div>
      </main>
    );
  }
}

export default Locations;
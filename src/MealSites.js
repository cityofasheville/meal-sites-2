import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Banner from './Banner';
import FilterOptions from './FilterOptions';
import ResultsMeta from './ResultsMeta';
import LocationCard from './LocationCard';
import MapLayout from './MapLayout';
import PrintLayout from './PrintLayout';
import NavBar from './NavBar';

class MealSites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationListFull: [],
      activeFilters: {},
      filterOptions: {},
      filterSelectors: [],
      showList: true,
      haveLocationData: false
    };
  }

  handleLookup = () => {
    axios.get(`${process.env.REACT_APP_ESRI_URL}`)
    .then(res => {
      let newActiveFilters = {};
      let locationsInitialized = this.processRawLocations(res.data.features);
      let currentUrlParams = new URLSearchParams(this.props.location.search);
      let paramString = currentUrlParams.toString();

      if (paramString.length) {
        Object.keys(locationsInitialized.filterOptions).forEach( (filter) => {
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
      area: {
        filterHeader: 'Where Located',
        defaultDescription: 'Any Area',
        selectLabel: 'Choose Specific Location(s):',
        data: []
      },
      day: {
        filterHeader: 'When Open',
        defaultDescription: 'Any Day of the Week',
        selectLabel: 'Choose Specific Day(s) Open:',
        data: []
      },
      type: {
        filterHeader: 'Service Provided',
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

    for (let obj of data) {

    // NOTE: originally ditched foreach loop b/c we needed to break the loop on encountering empty row from spreadsheet
    // since we started pulling more reliable data, may revert to foreach if desired 

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
  
          if (filterOptions.area.data.map(function(e) { return e.value; }).indexOf(sanitizedValue) < 0) {
              filterOptions.area.data.push(
              {
                label: obj.attributes.generalArea,
                value: sanitizedValue,
                count: 0
              }
            );
          }
        }
  
        if (obj.attributes.type) {
  
          sanitizedValue = 'type-' + obj.attributes.type.toLowerCase().replace(/[^0-9a-z]/gi, '');
          cardSelectors += sanitizedValue + ' ';
  
          if (filterOptions.type.data.map(function(e) { return e.value; }).indexOf(sanitizedValue) < 0) {
            if (obj.attributes.type === 'Students') { 
              typeLabel = 'Student Meals' 
            } else {
              typeLabel = obj.attributes.type 
            }
            filterOptions.type.data.push(
              {
                label: typeLabel,
                value: sanitizedValue,
                count: 0
              }
            );
          }
        }
  
        if (obj.attributes.mo) {
          cardSelectors += 'day-mo ';
          dayClassM = 'day-of-week--on';
          if (filterOptions.day.data.map(function(e) { return e.value; }).indexOf('day-mo') < 0) {
            filterOptions.day.data.push(
              {
                index: 0,
                label: 'Monday',
                value: 'day-mo',
                count: 0
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
          if (filterOptions.day.data.map(function(e) { return e.value; }).indexOf('day-tu') < 0) {
            filterOptions.day.data.push(
              {
                index: 1,
                label: 'Tuesday',
                value: 'day-tu',
                count: 0
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
          if (filterOptions.day.data.map(function(e) { return e.value; }).indexOf('day-we') < 0) {
            filterOptions.day.data.push(
              {
                index: 2,
                label: 'Wednesday',
                value: 'day-we',
                count: 0
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
          if (filterOptions.day.data.map(function(e) { return e.value; }).indexOf('day-th') < 0) {
            filterOptions.day.data.push(
              {
                index: 3,
                label: 'Thursday',
                value: 'day-th',
                count: 0
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
          if (filterOptions.day.data.map(function(e) { return e.value; }).indexOf('day-fr') < 0) {
            filterOptions.day.data.push(
              {
                index: 4,
                label: 'Friday',
                value: 'day-fr',
                count: 0
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
          if (filterOptions.day.data.map(function(e) { return e.value; }).indexOf('day-sa') < 0) {
            filterOptions.day.data.push(
              {
                index: 5,
                label: 'Saturday',
                value: 'day-sa',
                count: 0
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
          if (filterOptions.day.data.map(function(e) { return e.value; }).indexOf('day-su') < 0) {
            filterOptions.day.data.push(
              {
                index: 6,
                label: 'Sunday',
                value: 'day-su',
                count: 0
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
  
        objCount++;
      } 
      // else {
      //   // Objects will be skipped if outside date range, or if name is NULL
      //   console.log(`** Skipping Record - ${obj.attributes.name} - ${obj.attributes.OBJECTID} - ${startDate} - ${endDate} **`);
      // }
    }

    console.log(`-- Objects processed (${objCount}) --`);

    // Sort the filter options sensibly for display
    filterOptions.area.data.sort( (a,b) => a.label > b.label ? 1 : -1 );
    filterOptions.type.data.sort( (a,b) => a.label > b.label ? 1 : -1 );
    filterOptions.day.data.sort( (a,b) => a.index > b.index ? 1 : -1 )

    console.log('-- Initialization Complete --');

    dataToReturn.filterOptions = filterOptions;
    dataToReturn.filterSelectors = filterSelectors;
    dataToReturn.objectsProcessed = objectsProcessed;

    return dataToReturn;
  }

  submitQueryString = (e) => {

    e.preventDefault();
    let currentUrlParams = new URLSearchParams(window.location.search);
    const newFilterValue = e.target.getAttribute("data-filter-value");
    const newFilterType = e.target.getAttribute("data-filter-type");

    console.log(`${newFilterValue} -- ${newFilterType}`);

    if (!currentUrlParams.has(newFilterType)) {
      currentUrlParams.set(newFilterType, newFilterValue);
      this.props.history.push(`?${currentUrlParams}`);
      console.log('Pushing history, component should update');
    } else {
      if (currentUrlParams.getAll(newFilterType).indexOf(newFilterValue) < 0) {
        currentUrlParams.append(newFilterType, newFilterValue);
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
    const removeFilterValue = e.target.getAttribute("data-filter-value");
    const removeFilterType = e.target.getAttribute("data-filter-type");

    let currentTypeParams = currentUrlParams.getAll(removeFilterType);
    console.log(currentTypeParams);

    let remainingTypeParams = currentTypeParams.filter( (item) => {
      return (item !== removeFilterValue);
    });

    // Deletes ALL params of a type (maybe not what we want)
    currentUrlParams.delete(removeFilterType);

    // If there was initially more than one param of the deleted type, add them back now
    if(remainingTypeParams.length) {
      remainingTypeParams.forEach( (param) => {
        currentUrlParams.append(removeFilterType, param);
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

  applyFilters = () => {

    // TODO - Correct counts for filters that are part of multi-value facet (like day of week)
    // Current counts work only for single value facets (like area or service type)
    // Think of grocery stores - they often proide EBT and WIC (two service types)
    
    let filterOptionReset = JSON.parse(JSON.stringify(this.state.filterOptions));

    let filteredDataForOutput = {
      locations: [],
      filterOptions: filterOptionReset
    }

    filteredDataForOutput.locations = this.state.locationListFull.filter( (location) => {

      let thisLocationPasses = true;
      let filterKeysFailed = [];
      let termMatches = 0;

      Object.keys(this.state.activeFilters).forEach( (activeFilterKey, i) => {
        if (this.state.activeFilters[activeFilterKey].length) {
          this.state.activeFilters[activeFilterKey].forEach( (term) => {
            if (location.selectors.includes(term)) {
              termMatches++;
            } 
          });
          if (!termMatches) {
            thisLocationPasses = false;
            filterKeysFailed.push(activeFilterKey);
          }
          termMatches = 0;
        }
      });

      // Following loop is to increment location count based on remaining locations
      Object.keys(filteredDataForOutput.filterOptions).forEach( (allFilterOptionsKey, i) => {
        if (filteredDataForOutput.filterOptions[allFilterOptionsKey].data.length) {
          filteredDataForOutput.filterOptions[allFilterOptionsKey].data.forEach( (termObject, i) => {
            let thisOptionLocationCounted = false;
            let otherFacetFailures = 0;
            filterKeysFailed.forEach( (failedKey, i) => {
              if (failedKey !== allFilterOptionsKey) {
                otherFacetFailures++;
              }
            });
            if (location.selectors.includes(termObject.value) && !otherFacetFailures && !thisOptionLocationCounted) {
              filteredDataForOutput.filterOptions[allFilterOptionsKey].data[i].count++;
              thisOptionLocationCounted = true;
            }
          });
        }
      });

      return thisLocationPasses; 
    });

    return filteredDataForOutput;
  }

  toggleView = (e) => {
    let toggleIcon = 'fas fa-angle-double-right me-1';
    let toggleText = 'Show List';

    if (!this.state.showList) {
      toggleIcon = 'fas fa-angle-double-left me-1';
      toggleText = 'Hide List';
    }
    document.getElementById("mapToggleButton").innerHTML = `<i class="${toggleIcon}" aria-hidden="true"></i> ${toggleText}`;
    let toggledValue = !this.state.showList;
    console.log(toggledValue);
    this.setState({
      showList: toggledValue
    });
  }

  render() {

    if ( !this.state.haveLocationData) {
      this.handleLookup();
      return(
        <h1><i className="fas fa-spinner"></i>Loading...</h1>
      );
    }

    console.log('STATE IN MAIN RENDER:');
    console.log(this.state);

    let filtersApplied = this.applyFilters();
    console.log('FILTERS APPLIED');
    console.log(filtersApplied);

    const locationGrid = filtersApplied.locations.map( (thisLocation,i) => {
      let thisKey = `location-${i}`;
      return (
        <div key={thisKey} className="location-item">
            <LocationCard location={thisLocation} />
        </div>
      );
    });

    let listContainerClasslist = 'h-100 col-xs-12 col-lg-6 col-xl-7 col-xxl-6 map-split-cards';
    let mapContainerClasslist = 'h-100 p-0 m-0 col-lg-6 col-xl-5 col-xxl-6 d-none d-lg-block';
    
    if (!this.state.showList) {
      listContainerClasslist = 'h-100 d-none map-split-cards';
      mapContainerClasslist = 'h-100 p-0 m-0 col-xs-12';      
    }

    return(
      <main id="main" title="List of Asheville Meal Sites" className="js-dependent no-print">

        <NavBar 
          activeFilters={this.state.activeFilters} 
          options={filtersApplied.filterOptions} 
          context='map' 
          changeHandler={this.submitQueryString} 
          removeHandler={this.removeQueryParam} 
        />
        
        {(!this.props.match.params.view) &&
          <div id="food-locations" className="h-100 container-fluid p-0 m-0">
            <Banner />       
          </div>        
        }

        {(this.props.match.params.view === 'print') &&
          <div id="food-locations" className="h-100 container">
            <PrintLayout filteredLocations={filtersApplied.locations} />       
          </div>        
        }

        {(this.props.match.params.view === 'map') &&
          <div className="h-100 container-fluid px-0">
            <div className="h-100 row m-0">
              <div className={listContainerClasslist}>
                <div className="h-100 p-0 m-0">
                  <div className="m-0 p-0">
                    <button className="mx-0 d-inline-block d-lg-none btn btn-light border-dark button-view-toggle" onClick={this.toggleView}>
                      <i className="fa fa-map-o nav-link-icon" aria-hidden="true"></i>Show Map
                    </button>
                  </div>
                  <div className="row row-cols-xs-1 mx-0 mt-4 px-4">
                    <ResultsMeta resultsCount={filtersApplied.locations.length} options={filtersApplied.filterOptions} activeFilters={this.state.activeFilters} removeHandler={this.removeQueryParam} />                    
                  </div>
                  <div id="food-locations" className="row row-cols-xs-1 row-cols-md-2 row-cols-lg-1 row-cols-xl-2 p-0 m-0">
                    {locationGrid}
                  </div>  
                </div>
              </div>
              <div className={mapContainerClasslist}>
                <div className="h-100 p-0 m-0 map-split">
                  <MapLayout showList={this.state.showList} toggleHandler={this.toggleView} filteredLocations={filtersApplied.locations} filteredAreas={this.state.activeFilters.hasOwnProperty('area') ? this.state.activeFilters.area : []} />            
                </div>
              </div>
            </div>
          </div>
        }

        <div className="modal fade" id="filtersModal" tabIndex="-1" aria-labelledby="filtersModalLabel" aria-hidden="true" data-bs-keyboard="true" data-bs-focus="true">
          <div className="modal-dialog modal-lg mt-4">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="filtersModalLabel">Adjust Filters</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <FilterOptions 
                  activeFilters={this.state.activeFilters} 
                  options={filtersApplied.filterOptions} 
                  context='map' 
                  changeHandler={this.submitQueryString} 
                  removeHandler={this.removeQueryParam} 
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-dark px-5" data-bs-dismiss="modal">Done</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
    );
  }
}

export default MealSites;
import React from 'react';

function FilterDropdown(props) {

  // This is a first crack at compiling already a list of ALL filters 
  const optionListDropdown = props.filterOptions.data.map( (thisOption, i) => {
    return (
      <li key={i}><a class="dropdown-item" data-value={thisOption.value} href="#">{thisOption.label} ({thisOption.count})</a></li>
    );
  });

  let activeFiltersList = [];

  let matchingLabel = '';

  if (props.activeFilters.hasOwnProperty(props.filterName)) {
    props.activeFilters[props.filterName].forEach( (filter, i) => {
      props.filterOptions.data.forEach( (option) => {
        if (option.value === filter) {
          matchingLabel = option.label;
        }
      });

      activeFiltersList.push({
        text: matchingLabel,
        value: filter
      });
    });
  }

  console.log(activeFiltersList);

  // This is a first crack at compiling already active filters 
  // (probably will instead want to display each filter only once, in either "add" or "remove" mode)
  const selectedFiltersDropdown = activeFiltersList.map( (filter, i) => {
    return(
    <li key={i}><a className="dropdown-item filter-button" href="#" data-filter-value={filter.value} data-filter-type={props.filterName} title="Click to remove this filter" onClick={props.removeHandler}>{filter.text}</a></li>
    );
  })

  return(
    <div>
      {/* 
      TODO: 
      - Bootstrap dropdown items for each filter type
      - Set data attributes accordingly
      - Figure out what click event looks like
      - Rewrite submitQueryString() in MealSites
      - Rewrite removeQueryParam() in MealSites
      - Test for active filters; if found, alter the dropdown item to be a "remove" filter option instead of "add"
      */}
    </div>
  );
}

export default FilterDropdown;
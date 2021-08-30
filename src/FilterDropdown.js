import React from 'react';

function FilterDropdown(props) {

  let activeTypeFilters, dropdownContainerClass = 'dropdown mx-2 mb-4 resource-filter', extraCountText = '';
  
  if (props.activeFilters.hasOwnProperty(props.filterName)) {
    activeTypeFilters = props.activeFilters[props.filterName];
    if (props.activeFilters[props.filterName].length) {
      dropdownContainerClass += ' resource-filter--active';
      extraCountText += ' more';
    }
  } else {
    activeTypeFilters = [];
  }

  const optionListDropdownAlt = props.filterOptions.data.reduce( (accumulator, currentOption, currentIndex) => {

    let thisAction, thisActionLabel, thisButtonClass = 'dropdown-item ';

    if (currentOption.count === 0) {
      thisButtonClass += ' disabled';
    }

    if (!activeTypeFilters.includes(currentOption.value)) {
      thisAction = props.changeHandler;
      thisActionLabel = 'Add the filter';

      // if(props.filterName === 'day') {
      //   showCount = false;
      // }

      accumulator.push(
        <li key={currentIndex}>
          <button 
            data-filter-value={currentOption.value} 
            data-filter-type={props.filterName} 
            className={thisButtonClass} 
            type="button" 
            title={`${thisActionLabel} ${currentOption.label}`} 
            onClick={thisAction}
            >
              {currentOption.label} 
              {currentOption.count ? ` (${currentOption.count}${extraCountText})` : ` (${currentOption.count})`}
          </button>
        </li>
      );
    }
    return accumulator;
  }, []);

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

  // console.log(activeFiltersList);

  const selectedFiltersDropdown = activeFiltersList.map( (filter, i) => {
    return (
      <li key={i}>
        <button 
          data-filter-value={filter.value} 
          data-filter-type={props.filterName} 
          className="dropdown-item" 
          type="button" 
          title={`Remove the filter ${filter.text}`} 
          onClick={props.removeHandler}
          >
            {filter.text} 
            <i className="far fa-times-circle ms-2 icon-in-button" aria-hidden="true"></i>
        </button>
      </li>
    );
  })

  return(
    <div className={dropdownContainerClass}>
      <button className="btn btn-outline-dark dropdown-toggle" type="button" id={`dropdownMenuButton-${props.filterName}`} data-bs-toggle="dropdown" aria-expanded="false">
        {props.filterOptions.filterHeader}
      </button>
      <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton-${props.filterName}`}>
        {selectedFiltersDropdown}
        {activeFiltersList.length > 0 &&
          <li><hr className="dropdown-divider" /></li>
        }
        {optionListDropdownAlt}
      </ul>
    </div>
  );
}

export default FilterDropdown;
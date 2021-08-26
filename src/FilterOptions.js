import React from 'react';
import FilterDropdown from './FilterDropdown';

function FilterOptions(props) {
  console.log(props);
  const filterKeys = Object.keys(props.options);
  const filterDropdownSet = filterKeys.map( (key, i) => {
    let thisKey = `filterdropdown-${i}`;
    return (
      <FilterDropdown key={thisKey} context={props.context} activeFilters={props.activeFilters} filterOptions={props.options[key]} filterName={key} changeHandler={props.changeHandler} removeHandler={props.removeHandler} />
    );
  });

  return(
    <section title="Filter meal sites based on geographical area, days open, or type of service provided." className="my-4 js-dependent no-print" id="navbarToggleExternalContent">

      <div className="btn-group d-block d-lg-flex full-width" role="group" aria-label="Filter meal sites based on geographical area, days open, or type of service provided.">       
        {filterDropdownSet}
      </div> 
     
    </section>
  );
}

export default FilterOptions;
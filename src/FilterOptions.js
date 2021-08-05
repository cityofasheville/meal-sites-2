import React from 'react';
import FilterCard from './FilterCard';

function FilterOptions(props) {
  console.log(props);
  const filterKeys = Object.keys(props.options);
  const filterCardSet = filterKeys.map( (key, i) => {
    let thisKey = `filtercard-${i}`;
    return (
      <FilterCard key={thisKey} context={props.context} activeFilters={props.activeFilters} filterOptions={props.options[key]} filterName={key} changeHandler={props.changeHandler} removeHandler={props.removeHandler} />
    );
  });

  // const optionListDropdown = props.options['areas'].data.map( (thisOption, i) => {
  //   return (
  //     <li key={i}><a class="dropdown-item" data-value={thisOption.value} href="#">{thisOption.label} ({thisOption.count})</a></li>
  //   );
  // });

  // const selectedFiltersDropdown = props.activeFilters.areas.map( (filter, i) => {
  //   return(
  //   <li key={i}><a className="dropdown-item" href="#" title="Click to remove this filter">{filter}</a></li>
  //   );
  // })

  return(
    <section title="Filter meal sites based on geographical area, days open, or type of service provided." className="container my-4 js-dependent no-print">
      <div id="object-filters" className="border rounded-lg py-3 px-1">
        <div className="row">
          <div className="col-12 mb-2 text-center">
            <h2 className="">Refine the list with filters</h2> 
            {/* <p>View meal sites by geographical area, day of the week, and/or service type offered.</p> */}
          </div>
        </div>
        <div className="row selected-filters">
          {filterCardSet}
        </div>
      </div>
      {/* 

      TODO: Call the new FilterDropdown component once it's ready. Goal is a strip of basic buttons with dropdown options
      TODO: Make a container to show selected filter options. Allow user option to de-select from original dropdown or kill from "selected filters" container

      <div className="btn-group d-flex" role="group" aria-label="Filter meal sites based on geographical area, days open, or type of service provided.">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Location
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            {optionListDropdown}
            <div class="dropdown-divider"></div>
            {selectedFiltersDropdown.length ? selectedFiltersDropdown : <li><a class="dropdown-item bg-coa-blue" href="#">Another action</a></li>}
          </ul>
        </div>
        <button type="button" className="btn btn-outline-dark w-100 ml-2">When Open</button>
        <button type="button" className="btn btn-outline-dark w-100 ml-2">Service</button>
      </div> 
      */}
    </section>
  );
}

export default FilterOptions;
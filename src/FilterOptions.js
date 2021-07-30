import React from 'react';
import FilterCard from './FilterCard';

function FilterOptions(props) {
  console.log(props);
  const filterKeys = Object.keys(props.options);
  const filterCardSet = filterKeys.map( (key, i) => {
    let thisKey = `filtercard-${i}`;
    return (
      <FilterCard key={thisKey} activeFilters={props.activeFilters} filterOptions={props.options[key]} filterName={key} changeHandler={props.changeHandler} removeHandler={props.removeHandler} />
    );
  });
  return(
    <section title="Filter meal sites based on geographical area, days open, or type of service provided." className="container my-5 js-dependent no-print">
      <div id="object-filters" className="border rounded-lg py-4 px-1">
        <div className="row">
          <div className="col-12 mb-3 text-center">
            <h2 className="">Refine the list with filters</h2> 
            <p>View meal sites by geographical area, day of the week, and/or service type offered.</p>
          </div>
        </div>
        <div className="row selected-filters">
          {filterCardSet}
        </div>
      </div>
    </section>
  );
}

export default FilterOptions;
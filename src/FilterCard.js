import React from 'react';

function FilterCard(props) {

  console.log('ACTIVE FILTERS IN CARD');
  let activeFilters = props.activeFilters[props.filterName];
  console.log(activeFilters);
  const optionList = props.filterOptions.data.map( (thisOption, i) => {
    return (
      <option key={i} value={thisOption.value}>{thisOption.label}</option>
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

  const selectedFilters = activeFiltersList.map( (filter, i) => {
    return(<li key={i} className="list-group-item filter-button" data-filter-value={filter.value} data-filter-type={props.filterName} title="Click to remove this filter" onClick={props.removeHandler}>{filter.text}</li>);
  })

  return(
    <div className="col-lg-4 mb-3">
      <div className="card inner m-3 h-100">
        <div className="card-header"><h3 className="d-inline">{props.filterOptions.filterHeader}</h3></div>
        <ul className="list-group list-group-flush" id={`list-group-${props.filterName}`}>
          <li className={`list-group-item selected-filters-default-${props.filterName}`}>{props.filterOptions.defaultDescription}</li>
          {selectedFilters}
        </ul>
        <div className="p-3">
          <label className="select-label" htmlFor={`select-filter-${props.filterName}`}>{props.filterOptions.selectLabel}</label>
          <select data-filter-type={props.filterName} name={`select-filter-${props.filterName}`} className="form-control form-control-sm mt-1" id={`filter-${props.filterName}`} onChange={props.changeHandler}>
            <option></option>
            {optionList}
          </select>  
        </div>
      </div>
    </div>
  );
}

export default FilterCard;
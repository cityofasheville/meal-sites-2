import React from 'react';

function FilterCard(props) {

  // let activeFilters = props.activeFilters[props.filterName];
  // console.log('ACTIVE FILTERS IN CARD');
  // console.log(activeFilters);
  const optionList = props.filterOptions.data.map( (thisOption, i) => {
    return (
      <option key={i} value={thisOption.value}>{thisOption.label} ({thisOption.count})</option>
    );
  });

  let filterClass = 'col-lg-4';

  if (props.context === 'map') {
    filterClass = 'col-xxl-4';
  }

  // const optionListDropdown = props.filterOptions.data.map( (thisOption, i) => {
  //   return (
  //     <li key={i}><a class="dropdown-item" data-value={thisOption.value} href="#">{thisOption.label} ({thisOption.count})</a></li>
  //   );
  // });

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

  // const selectedFiltersDropdown = activeFiltersList.map( (filter, i) => {
  //   return(
  //   <li key={i}><a className="dropdown-item filter-button" href="#" data-filter-value={filter.value} data-filter-type={props.filterName} title="Click to remove this filter" onClick={props.removeHandler}>{filter.text}</a></li>
  //   );
  // })

  return(
    <div className={`${filterClass} mb-3`}>
      <div className="card inner m-3 h-100">
        <div className="card-header"><h3 className="d-inline">{props.filterOptions.filterHeader}</h3></div>
        <ul className="list-group list-group-flush" id={`list-group-${props.filterName}`}>
          {selectedFilters.length === 0 &&
            <li className={`list-group-item selected-filters-default-${props.filterName}`}>{props.filterOptions.defaultDescription}</li>
          }
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
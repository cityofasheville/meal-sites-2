import React from 'react';

function ResultsMeta(props) {

  let removeFilterButtons = [];

  Object.keys(props.activeFilters).forEach( (activeFilterKey, i) => {
    
    if (props.activeFilters[activeFilterKey].length) {
      
      const thisKeysFilters = props.activeFilters[activeFilterKey].map( (thisFilter, i) => {
        let thisKey = `${activeFilterKey}-${i}`;

        const filterLabel = props.options[activeFilterKey].data.find( (option) => {
          return (option.value === thisFilter);
        });

        return(
          <button 
            key={thisKey}
            data-filter-value={thisFilter} 
            data-filter-type={activeFilterKey} 
            className='btn btn-outline-dark btn-sm me-3 mb-3 button-filter__remove' 
            type="button" 
            title={`Remove the filter ${filterLabel.label}`} 
            onClick={props.removeHandler}
            >
              {filterLabel.label} <i className="fa fa-close ms-2 icon-in-button" aria-hidden="true"></i>
          </button>
        )
      });

      removeFilterButtons = removeFilterButtons.concat(thisKeysFilters);

    }
  });


  return(
    <header className="ps-0 mb-4 results-meta-container">
      <h2 className="mb-0 me-3">
        {props.resultsCount} Food resources found
      </h2>
      <div className="my-4">
        {removeFilterButtons}
      </div>
    </header>
  );
}

export default ResultsMeta;
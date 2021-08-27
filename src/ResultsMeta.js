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
            className='btn btn-outline-dark btn-sm me-3 button-filter__remove' 
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
    <div className="ps-0">
      <h2 className="mb-0 me-3"><i className="fas fa-map-marker-alt me-2" aria-hidden="true"></i>{props.resultsCount} resources found
      </h2>
      <div className="my-3">
        {removeFilterButtons}
      </div>
      <hr className="mt-4" />
    </div>
  );
}

export default ResultsMeta;
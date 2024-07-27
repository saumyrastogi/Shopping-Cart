import React, { useState } from "react";
import Rating from "../Rating";
import "./styles.css";

const Filters = React.memo(({ list, filterList, unFilteredList }) => {
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [rating, setRating] = useState(0);

  const removeFilter = () => {
    filterList(unFilteredList);
    setFilterApplied(false);
    rating == 0 ? setRating(-1) : setRating(0);
  };

  return (
    <div className="filters">
      <h3>Apply filter</h3>
      <div className="filters_startbased">
        <h5>Filter based on rating</h5>
        <Rating
          unFilteredList={unFilteredList}
          rating={rating}
          enableRatingSetter={true}
          setFilterApplied={setFilterApplied}
          filterList={filterList}
          list={list}
          isFilterApplied={isFilterApplied}
        />
        {isFilterApplied && (
          <button onClick={removeFilter}>Remove filter</button>
        )}
      </div>
    </div>
  );
});

export default Filters;

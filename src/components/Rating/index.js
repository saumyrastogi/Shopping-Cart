import React, { useEffect, useState } from "react";
import { whiteStar, yellowStar } from "../../constants";
import "./styles.css";

const Rating = React.memo(
  ({
    rating = 0,
    enableRatingSetter = false,
    setFilterApplied = () => {},
    unFilteredList,
    filterList = () => {},
    isFilterApplied,
    list,
  }) => {
    const [ratingArr, setRatingArr] = useState([]);
    const [filterRating, setFilterRating] = useState(null);

    useEffect(() => {
      let { tmpArr } = getRatingArr(rating);
      setRatingArr(tmpArr);
    }, [rating]);

    useEffect(() => {
      let { selectedRating } = getRatingArr(rating);
      filterRating &&
        isFilterApplied &&
        selectFilter(filterRating || selectedRating);
    }, [JSON.stringify(list)]);

    const getRatingArr = (rating) => {
      let tmpArr = [];
      let selectedRating = null;
      for (let i = 0; i < 5; i++) {
        if (i <= rating - 1) tmpArr.push(yellowStar);
        else {
          if (selectedRating === null) selectedRating = i;
          tmpArr.push(whiteStar);
        }
      }
      return { tmpArr, selectedRating };
    };

    const selectFilter = (ind) => {
      if (enableRatingSetter) {
        let { tmpArr } = getRatingArr(ind + 1);
        let newList =
          unFilteredList?.filter((item) => item.rating === ind + 1) || [];
        setFilterRating(ind);
        filterList(newList);
        setRatingArr(tmpArr);
        setFilterApplied(true);
      }
    };

    return (
      <div className="star_rating">
        {ratingArr.map((src, ind) => {
          return <img onClick={() => selectFilter(ind)} src={src} />;
        })}
      </div>
    );
  }
);

export default Rating;

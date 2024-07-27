import "./styles.css";
import ShoppingList from "../ShoppingList";
import { useState, useEffect } from "react";
import Filters from "../Filters";

const PaginationList = ({
  list,
  addToCart,
  removeFromCart,
  showCart,
  itemPerPage,
  currPage,
  setCurrPage,
  setInventory,
  unFilteredList,
  filterList,
}) => {
  const [initial, setInitial] = useState(true);
  const [currList, setCurrList] = useState([]);
  const [pageLink, setPageLink] = useState([]);
  const [currPageLink, setCurrPageLink] = useState([]);

  const pageLinkLength = pageLink.length;
  const showNext = currPage < pageLink[pageLinkLength - 1] - 1;
  const showPrev = currPage > 0;

  useEffect(() => {
    const pageLinkArr = [];
    for (let i = 0; i < list.length / itemPerPage; i++) {
      pageLinkArr.push(i + 1);
    }
    setPageLink(pageLinkArr);
    setCurrPageLink(pageLinkArr.slice(0, 3));
  }, [list, currList]);

  useEffect(() => {
    itemPerPage < list.length
      ? setCurrList(
          list.slice(
            currPage * itemPerPage,
            currPage * itemPerPage + itemPerPage
          )
        )
      : setCurrList(list);
    let currPageArr = [];
    if (currPage == 0 && !initial) {
      currPageArr = pageLink.slice(0, 3);
      setCurrPageLink(currPageArr);
    } else if (currPage == pageLinkLength - 1) {
      currPageArr = pageLink.slice(pageLinkLength - 3, pageLinkLength);
      setCurrPageLink(currPageArr);
    } else if (currPage > 0 && currPage < pageLink[pageLinkLength - 1]) {
      currPageArr = pageLink.slice(currPage - 1, currPage + 2);
      setCurrPageLink(currPageArr);
    }
  }, [currPage, list]);

  const handleLinkClick = (pageNumber) => {
    if (initial) setInitial(false);
    setCurrPage(pageNumber - 1);
  };

  return (
    <>
      <div className="list_container">
        <Filters
          list={list}
          setList={setInventory}
          unFilteredList={unFilteredList}
          filterList={filterList}
        />
        <ShoppingList
          inventory={currList}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          showCart={showCart}
        />
      </div>

      {currPageLink.length > 1 && (
        <div className="link">
          <h3
            className={showPrev ? null : "hidden"}
            onClick={() => handleLinkClick(currPage)}
          >
            {"<<"}
          </h3>
          {currPageLink.map((item) => (
            <h3
              className={currPage == item - 1 ? "active" : "inactive"}
              onClick={() => handleLinkClick(item)}
            >
              {item}
            </h3>
          ))}
          <h3
            className={showNext ? null : "hidden"}
            onClick={() => handleLinkClick(currPage + 2)}
          >
            {">>"}
          </h3>
        </div>
      )}
    </>
  );
};

export default PaginationList;

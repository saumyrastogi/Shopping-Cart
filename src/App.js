import "./styles.css";
import { useCallback, useEffect, useState } from "react";
import Cart from "./components/Cart";
import PaginationList from "./components/PaginatedList";
import { getShoppingItems } from "./components/ShoppingList/constants";

export default function App() {
  const [inventory, setInventory] = useState(getShoppingItems);
  const [filteredInventory, setFilteredInventory] = useState(getShoppingItems);
  const [sectionVisible, setSectionVisible] = useState("list");
  const [currPage, setCurrPage] = useState(0);
  const [cartDetails, setCartDetails] = useState({
    items: [],
    subTotal: 0,
    total: 0,
    discount: 0,
  });

  useEffect(() => {
    setFilteredInventory(inventory);
  }, [inventory]);

  const getNewInventory = (inventory, item, newItem) => {
    let inv = [...inventory];
    let inventoryInd = inv.findIndex((ele) => ele.id == item.id);
    inv[inventoryInd] = newItem;
    return inv;
  };

  const addItemToCart = (item) => {
    let newItem = {
      ...item,
      inCart: true,
      addedQuantity: item.addedQuantity + 1,
    };
    let newInventory = getNewInventory(inventory, item, newItem);
    let cart = { ...cartDetails };
    let isNewItemInCart = cart.items.findIndex((ele) => ele.id == item.id);
    if (isNewItemInCart == -1) cart.items.push(newItem);
    else cart.items[isNewItemInCart] = newItem;
    cart.total = cart.total + item.price;
    cart.subTotal = cart.subTotal + item.price;
    setInventory(newInventory);
    setCartDetails(cart);
  };

  const removeItemFromCart = useCallback((item) => {
    let removeFromCart = item.addedQuantity - 1 == 0;
    let newItem = {
      ...item,
      inCart: !removeFromCart,
      addedQuantity: removeFromCart ? 0 : item.addedQuantity - 1,
    };
    let newInventory = getNewInventory(inventory, item, newItem);
    let cart = { ...cartDetails };
    let cartInd = cart.items.findIndex((ele) => ele.id == item.id);
    if (removeFromCart) cart.items.splice(cartInd, 1);
    else cart.items[cartInd] = newItem;
    cart.total = cart.total - item.price;
    cart.subTotal = cart.subTotal - item.price;
    if (cart.discount > 0 && !(cart.subTotal > cart.discount)) {
      alert("Total should be greater than discount. You can buy for free!");
      cart.discount = 0;
    }
    setInventory(newInventory);
    setCartDetails(cart);
  }, []);

  const addDiscount = (e) => {
    if (!cartDetails.items.length)
      alert("Hey, you forgot to add items in your cart!");
    else if (cartDetails.subTotal < e.target.value)
      alert(`You can't buy it for free!`);
    else setCartDetails({ ...cartDetails, discount: parseInt(e.target.value) });
  };

  return (
    <div className="App">
      {sectionVisible == "list" ? (
        <PaginationList
          unFilteredList={inventory}
          list={filteredInventory}
          filterList={setFilteredInventory}
          setInventory={setInventory}
          addToCart={addItemToCart}
          removeFromCart={removeItemFromCart}
          showCart={setSectionVisible}
          itemPerPage={6}
          currPage={currPage}
          setCurrPage={setCurrPage}
        />
      ) : (
        <Cart
          cartDetails={cartDetails}
          addDiscount={addDiscount}
          showList={setSectionVisible}
          removeFromCart={removeItemFromCart}
          unFilteredList={inventory}
          filterList={setFilteredInventory}
        />
      )}
    </div>
  );
}

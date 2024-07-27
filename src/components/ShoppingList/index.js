import "./styles.css";
import { cartUrl } from "../../constants";
import Rating from "../Rating";

const ShoppingList = ({ inventory, addToCart, removeFromCart, showCart }) => {
  const getCountManipulatorUI = (item) => {
    const { inCart, addedQuantity } = item;
    return inCart ? (
      <div className="counter">
        <button onClick={() => addToCart(item)}>+</button>
        <span>{addedQuantity}</span>
        <button onClick={() => removeFromCart(item)}>-</button>
      </div>
    ) : (
      <button onClick={() => addToCart(item)}>{"Add to cart"}</button>
    );
  };

  return (
    <div className="shoplist">
      <div className="header">
        <h2>Shopping List</h2>
        <img
          className="cartImg"
          src={cartUrl}
          onClick={() => showCart("cart")}
        />
      </div>
      <div className="list_itemList">
        {inventory.map((item, index) => {
          const { imgUrl, name, price } = item;
          return (
            <div className="list_itemList_item" key={index}>
              <img src={imgUrl} />
              <span>{`${name} @ Rs ${price}`}</span>
              <Rating rating={item.rating} />
              {getCountManipulatorUI(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShoppingList;

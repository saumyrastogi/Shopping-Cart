import "./styles.css";
import { listUrl } from "../../constants";

const Cart = ({
  cartDetails,
  addDiscount,
  showList,
  removeFromCart,
  unFilteredList,
  filterList,
}) => {
  const { items = [], subTotal = 0, total = 0, discount = 0 } = cartDetails;

  return (
    <div className="cart">
      <div className="header">
        <h2>Cart</h2>
        <img
          src={listUrl}
          onClick={() => {
            filterList(unFilteredList);
            showList("list");
          }}
        />
      </div>
      <div className="cart_container">
        {
          <div className="cart_container_list">
            <div className="cart_container_list_offers">
              <select onChange={(e) => addDiscount(e)}>
                <option value={0}>Select offer</option>
                <option value={40}>Flat Rs 40 off</option>
                <option value={80}>Flat Rs 80 off</option>
              </select>
            </div>
            <div className="cart_container_list_header">
              <div className="header_header1">
                <h3>Items for checkout</h3>
                {items.map((item, index) => {
                  return (
                    <div className="cart_container_list_item_container">
                      <span>{item.name}</span>
                      <button onClick={() => removeFromCart(item, index)}>
                        -
                      </button>
                    </div>
                  );
                })}
                <div className="cart_container_list_item_container">
                  <span>Sub Total</span>
                </div>
                {discount ? (
                  <div className="cart_container_list_item_container">
                    <span>Discount</span>
                  </div>
                ) : null}
                <div className="cart_container_list_item_total">
                  <span>Grand Total</span>
                </div>
              </div>
              <div className="header_header2">
                <h3>Price</h3>
                {items.map(({ price, addedQuantity }) => {
                  return (
                    <div className="cart_container_list_item">
                      <span>{`${addedQuantity} X Rs ${price}`}</span>
                    </div>
                  );
                })}
                <div className="cart_container_list_item">
                  <span>{`Rs ${subTotal}`}</span>
                </div>
                {discount ? (
                  <div className="cart_container_list_item_discount">
                    <span>{`- Rs ${discount}`}</span>
                  </div>
                ) : null}
                <div className="cart_container_list_item_total">
                  <span>{`Rs ${total - discount}`}</span>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Cart;

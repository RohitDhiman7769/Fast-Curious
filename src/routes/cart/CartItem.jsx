import React from "react";
import ChangeItemQuantity from "./ChangeItemQuantity";
import { useDispatch, useSelector } from "react-redux";
import { addProductItem } from "../../store/products";
import { clearCart } from "../../store/orderSummary";
const CartItem = ({
  // handleAddProduct,
  // handleRemoveProduct,
  // clearCart,
  // cartItems,
  cartTotals,
}) => {

  const cartItems = useSelector((store)=>store.products.cart)
  const dispatch = useDispatch()
  
    const clearCartData = () => {
      // setProducts((prev) => ({ ...prev, cart: [] }));

      dispatch(addProductItem({
        cart: [],
      }))

      dispatch(clearCart({
        quantity: 0,
        payment: 0,
        taxes: 0,
      }))
      sessionStorage.removeItem("cartItems");
      sessionStorage.removeItem("cartQuantity");
      ResetLocation();
    };
  
  return (
    <section className="cart__items">
      {cartItems.map((cartItem, index) => {
        return (
          <article
            className="cart__items__single"
            key={index}
            aria-labelledby={`item-title-${index}`}>
            <img
              src={cartItem.ItemImg}
              alt={cartItem.ItemName}
            />
            <div className="cart__items__content">
              <header className="cart__items__info">
                <h3
                  id={`item-title-${index}`}
                  className="cart__items__title">
                  {cartItem.ItemName}
                  {cartItem.userSelectedAttributes.length > 0 &&
                    cartItem.userSelectedAttributes.map((i, index) => {
                      return <span key={index}>{i.attributeValue}</span>;
                    })}
                </h3>
                <p className="cart__items__ingredients">
                  {cartItem.ItemIngredients}
                </p>
              </header>
              <div className="cart__items__interaction">
                <ChangeItemQuantity
                  // handleAddProduct={handleAddProduct}
                  // handleRemoveProduct={handleRemoveProduct}
                  cartItem={cartItem}
                />
                <p className="cart__items__pricing">${cartItem.ItemPrice}</p>
              </div>
            </div>
          </article>
        );
      })}
      {cartItems.length > 0 && (
        <button
          onClick={clearCartData}
          className="cart__items__clear-btns"
          aria-label="remove all items from the cart">
          remove all items from the cart
        </button>
      )}
      {cartTotals}
    </section>
  );
};

export default CartItem;

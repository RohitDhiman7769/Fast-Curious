import React from "react";
import { v4 as uuidv4 } from "uuid";
//components
import CheckoutForm from "./CheckoutForm";
import EmptyCart from "../cart/EmptyCart";
import "./checkout.css";
import CheckoutItem from "./CheckoutItem";
import { useSelector } from "react-redux";
const Checkout = ({
  // cartItems,
  // productsQuantity,
  // totalPayment,
  // orderSummary,
  currentUser,
}) => {
  const cartItems = useSelector((store)=>store.products.items.cart)
  const orderSummary = useSelector((store) => store.orderSummary.summeryData)

  return (
    <main className="checkout">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="checkout__inner">
          {cartItems.map((cartItem) => (
            <CheckoutItem
              key={uuidv4()}
              cartItem={cartItem}
            />
          ))}
          <CheckoutForm
            productsQuantity={orderSummary.quantity}
            totalPayment={orderSummary.total}
            taxes={orderSummary.taxes}
            currentUser={currentUser}
          />
        </div>
      )}
    </main>
  );
};

export default Checkout;

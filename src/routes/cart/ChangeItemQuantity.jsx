// import React from "react";

// const ChangeItemQuantity = ({
//   handleAddProduct,
//   handleRemoveProduct,
//   cartItem,
// }) => {
//   return (
//     <div className="cart__add-items">
//       <button
//         onClick={() => {
//           handleAddProduct(cartItem, cartItem.userSelectedAttributes);
//         }}
//         aria-label={`Add ${cartItem.ItemName} to the cart`}>
//         +
//       </button>
//       <p>{cartItem.quantity}</p>
//       <button
//         onClick={() => {
//           handleRemoveProduct(cartItem, cartItem.userSelectedAttributes);
//         }}
//         aria-label={`Remove ${cartItem.ItemName} from the cart`}>
//         -
//       </button>
//     </div>
//   );
// };

// export default ChangeItemQuantity;




import React from "react";
import { handleAddProduct } from '../../utils/getUser'
import { products } from "../../data/products";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/orderSummary";
import { addProductItem } from "../../store/products";
import { handleRemoveProduct } from "../../utils/getUser";

const ChangeItemQuantity = ({
  // handleAddProduct,
  // handleRemoveProduct,
  cartItem,
}) => {
  const dispatch = useDispatch()
  const products = useSelector((store) => store.products.items.cart)

  const click = () => {
    console.log('click')
    handleAddProduct(cartItem, cartItem.userSelectedAttributes, products, dispatch);
    // dispatch(addItem({
    //   quantity: sum,
    // }))
  }

  // const handleRemoveProduct = (target, targetAttr) => {
  //   let productToUpdate = CheckRepeatableProducts(target, targetAttr, productsData);
  //   const hasAttribute = productToUpdate[0].attributes.length > 0;
  //   let productsCopy = [];
  //   if (hasAttribute) {
  //     productsCopy = products.cart
  //       .map((item) =>
  //         item.userSelectedAttributes[0]?.attributeValue ===
  //           productToUpdate[0].userSelectedAttributes[0]?.attributeValue
  //           ? { ...item, quantity: item.quantity - 1 }
  //           : item
  //       )
  //       .filter((item) => item.quantity > 0);
  //   } else {
  //     productsCopy = products.cart
  //       .map((item) =>
  //         item.id === productToUpdate[0].id
  //           ? { ...item, quantity: item.quantity - 1 }
  //           : item
  //       )
  //       .filter((item) => item.quantity > 0);
  //   }
  //   // setProducts((prev) => ({ ...prev, cart: productsCopy }));
  //   dispatch(addProductItem({
  //     cart: productsCopy,
  //   })
  //   )
  //   const jsonUser = JSON.stringify(productsCopy);
  //   sessionStorage.setItem("cartItems", jsonUser);

  //   const sum = [...productsCopy].reduce((a, b) => a + b.quantity, 0);
  //   sessionStorage.setItem("cartQuantity", sum);
  //   // setOrderSummary((prev) => ({
  //   //   ...prev,
  //   //   quantity: sum,
  //   // }));


  //   dispatch(addItem({
  //     quantity: sum,
  //   }))
  // };

  const removeData = () => {
    () => {
      handleRemoveProduct(cartItem, cartItem.userSelectedAttributes,products,dispatch);
    }
  }

  return (
    <div className="cart__add-items">
      <button
        onClick={click}
        aria-label={`Add ${cartItem.ItemName} to the cart`}>
        +
      </button>
      <p>{cartItem.quantity}</p>
      <button
        onClick={removeData}
        aria-label={`Remove ${cartItem.ItemName} from the cart`}>
        -
      </button>
    </div>
  );
};

export default ChangeItemQuantity;

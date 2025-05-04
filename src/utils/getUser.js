import { addItem , clearCart } from "../store/orderSummary";
import { addProductItem } from "../store/products";
export const getUser = async (id) => {
  try {
    const response = await fetch(`${USERS_URL}/${id}`);
    const { data } = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    setCurrentUser(data[0]);
    sessionStorage.setItem("currentUser", JSON.stringify(data[0]));
    return true;
  } catch (err) {
    console.log(err.statusText);
    return false;
  }
};




export const CheckRepeatableProducts = (targetProduct, attributes, products) => {
  console.log(products,targetProduct.id)
  // products
  let inCart; 
  if(products.cart == undefined){
    inCart = false
  }else{
    (products.cart ?? []).some((item) => item.id === targetProduct.id);
  }
  if (!inCart) {
    return undefined;
  } else {
    let match = (products.cart ?? []).filter((item) => item.id === targetProduct.id);
    let target = match.filter((item) =>
      item.userSelectedAttributes.length === 0
        ? true
        : item.userSelectedAttributes[0].attributeValue ===
        attributes[0].attributeValue
    );
    if (target.length === 0) {
      return undefined;
    }
    return target;
  }
};

export const handleAddProduct = (targetProduct, userSelectedAttributes, products, dispatch) => {
  console.log(products)
  const productAlreadyInCart = CheckRepeatableProducts(
    targetProduct,
    userSelectedAttributes, products
  );
  let currentCartItems = [(products.cart ?? [])];
  let newQuantity;
  if (productAlreadyInCart === undefined) {
    const itemToAdd = targetProduct;
    newQuantity = 1;
    currentCartItems.push({
      ...itemToAdd,
      userSelectedAttributes,
      quantity: newQuantity,
    });
  } else {
    let index;
    if (userSelectedAttributes.length === 0) {
      index = products.cart.findIndex((item) => item.id === targetProduct.id);
    } else {
      index = products.cart.findIndex(
        (item) =>
          item.userSelectedAttributes[0]?.attributeValue ===
          userSelectedAttributes[0].attributeValue &&
          item.id === targetProduct.id
      );
    }
    if (index !== -1) {
      newQuantity = products.cart[index].quantity;

      currentCartItems[index] = {
        ...products.cart[index],
        quantity: newQuantity + 1,
      };
    }
  }

  const totalCartQuantity = currentCartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const jsonUser = JSON.stringify(currentCartItems);
  sessionStorage.setItem("cartItems", jsonUser);
  // setProducts((prev) => ({ ...prev, cart: currentCartItems }));
  sessionStorage.setItem("cartQuantity", totalCartQuantity);
  // setOrderSummary((prev) => ({
  //   ...prev,
  //   quantity: totalCartQuantity,
  // }));


  dispatch(addItem({
    quantity: totalCartQuantity,
  }))
  // successMsg();
};



export const handleLogout = (dispatch) => {
  // setIsValidLogin(false);
  localStorage.setItem('validLogin', false)
  hideMenu();
  setCurrentUser({});
  ResetLocation();
  // setProducts((prev) => ({ ...prev, cart: [] }));
  // setOrderSummary({
  //   quantity: 0,
  //   payment: 0,
  //   taxes: 0,
  // });
  dispatch(addProductItem({
    cart: [],
  }))

  dispatch(clearCart({
    quantity: 0,
    payment: 0,
    taxes: 0,
  }))
  // sessionStorage.clear();
};




 export const handleRemoveProduct = (target, targetAttr,products,dispatch) => {
    let productToUpdate = CheckRepeatableProducts(target, targetAttr, products);
    const hasAttribute = productToUpdate[0].attributes.length > 0;
    let productsCopy = [];
    if (hasAttribute) {
      productsCopy = products.cart
        .map((item) =>
          item.userSelectedAttributes[0]?.attributeValue ===
            productToUpdate[0].userSelectedAttributes[0]?.attributeValue
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    } else {
      productsCopy = products.cart
        .map((item) =>
          item.id === productToUpdate[0].id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    }
    // setProducts((prev) => ({ ...prev, cart: productsCopy }));
    dispatch(addProductItem({
      cart: productsCopy,
    })
    )
    const jsonUser = JSON.stringify(productsCopy);
    sessionStorage.setItem("cartItems", jsonUser);

    const sum = [...productsCopy].reduce((a, b) => a + b.quantity, 0);
    sessionStorage.setItem("cartQuantity", sum);
    // setOrderSummary((prev) => ({
    //   ...prev,
    //   quantity: sum,
    // }));


    dispatch(addItem({
      quantity: sum,
    }))
  };



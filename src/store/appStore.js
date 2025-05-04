import { configureStore } from "@reduxjs/toolkit";
import orderSummary from './orderSummary'
import products from './products'
const appStore = configureStore({
    reducer: {
        orderSummary: orderSummary,
        products: products,
      },
})


export default appStore;
import { createSlice } from "@reduxjs/toolkit";
// import { addItem } from "./cartSlice";

const orderSummary = createSlice({
    name: 'orderSummary',
    initialState: {
        summeryData: {quantity: 0,payment: 0,taxes: 0}
    },
    reducers: {
        addItem: (state, action) => {
            console.log(action)
            state.quantity = action.payload.quantity
            state.payment = action.payload.payment
            state.taxes = action.payload.taxes
        },
        clearCart: (state, action) => {
            state.quantity = 0,
                action.quantity = 0
        }
    }
})

export const { addItem, clearCart } = orderSummary.actions

export default orderSummary.reducer


import { createSlice } from "@reduxjs/toolkit";

const products = createSlice({
    name : 'products',
    initialState : {
        items : {all: [], cart: [] }
    },
    reducers : {
        addProductItem: (state, action )=>{
            console.log(action)
            state.items.all = action.payload.all
            state.items.cart = action.payload.cart
        },
        
    }
})

export const {addProductItem} = products.actions
export default products.reducer
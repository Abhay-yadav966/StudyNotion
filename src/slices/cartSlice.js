import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalItems: localStorage.getItem("totalItem")? ( JSON.parse(localStorage.getItem("totalItem")) ):(0)
}

export const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setItems(state, value){
            state.totalItems = value.payload;
        }
        // add to cart
        // remove cart
        // reset cart
    }
});

export const {setItems} = cartSlice.actions;
export default cartSlice.reducer;
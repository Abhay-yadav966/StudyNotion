import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const initialState = {
    user: localStorage.getItem("user") ? (JSON.parse(localStorage.getItem("user"))) : (null),
}

export const profileSlice = createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setProfile(state, value){
            state.user = value.payload;
        }
    }
})

export const {setProfile} = profileSlice.actions;
export default profileSlice.reducer;
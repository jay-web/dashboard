import { configureStore } from "@reduxjs/toolkit";
import globalReducers from "./index";


const store = configureStore({
    reducer:{
        global: globalReducers
    }
})

export default store;
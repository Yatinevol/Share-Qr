import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice.js"
import qrSlice from "../features/qrSlice.js"
const store = configureStore({
    reducer:{
        auth : authSlice,
        qr: qrSlice
    }
})

export default store
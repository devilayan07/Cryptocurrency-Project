import { configureStore } from "@reduxjs/toolkit";
import CryptoSlice from "./CryptoSlice";


export const store=configureStore({
    reducer:{
        Crypto:CryptoSlice
    }
})
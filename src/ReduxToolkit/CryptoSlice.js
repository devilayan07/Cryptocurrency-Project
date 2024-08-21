import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCryto=createAsyncThunk("/assets",async()=>{
    const response=await axios.get("https://api.coincap.io/v2/assets")
    console.log(response?.data)
    return response?.data
})

export const fetchCrytoDetails=createAsyncThunk("/assets/id",async(id)=>{
    const response=await axios.get(`https://api.coincap.io/v2/assets/${id}`)
    console.log(response?.data?.data)
    return response?.data?.data

})

export const fetchCrytoUpdate=createAsyncThunk("/assets/update",async({id,user})=>{
    const response=await axios.put(`https://api.coincap.io/v2/assets/${id}`,user)
    console.log(response?.data)
    return response?.data?.data


})

const CryptoSlice=createSlice({
    name:"crypto",
    initialState:{
        isLoading:false,
        assets:[],
        singleassets:[],
        status:"idle",
        updatedAsset:[],
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCryto.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(fetchCryto.fulfilled,(state,action)=>{
            state.isLoading=false
            state.assets=action?.payload
            state.error=null
        })
        builder.addCase(fetchCryto.rejected,(state,action)=>{
            state.isLoading=false
            state.assets=[]
            state.error=action.error.message
        })
        builder.addCase(fetchCrytoDetails.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(fetchCrytoDetails.fulfilled,(state,action)=>{
            state.isLoading=false
            state.singleassets=action?.payload
            state.error=null
        })
        builder.addCase(fetchCrytoDetails.rejected,(state,action)=>{
            state.isLoading=false
            state.singleassets=[]
            state.error=action.error.message
        })
        builder.addCase(fetchCrytoUpdate.pending,(state)=>{
            state.status="loading"
        })
        builder.addCase(fetchCrytoUpdate.fulfilled,(state,action)=>{
            state.status="idle"
            const updatedAsset = action.payload;
    state.singleassets = {
        ...state.singleassets,
        ...updatedAsset
    };
            
        })
        builder.addCase(fetchCrytoUpdate.rejected,(state)=>{
            state.status="idle"
        })

    }
})

export default CryptoSlice.reducer


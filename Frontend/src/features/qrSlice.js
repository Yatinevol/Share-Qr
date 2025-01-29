import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    qrCodes : [],
    currentPage : 1,
    totalPages : 1

}
const qrSlice = createSlice({
    name :"qr",
    initialState,
    reducers:{
        getAllQrs:(state, action)=>{
            state.qrCodes = action.payload.qrCodes
            state.currentPage = action.payload.currentPage
            state.totalPages = action.payload.totalPages
        },
        setCurrentPage : (state, action)=>{
            state.currentPage = action.payload
        }
    }
})
export const {getAllQrs, setCurrentPage} = qrSlice.actions
export default qrSlice.reducer
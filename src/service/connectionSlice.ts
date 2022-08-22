import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isUser: false,
    accountInfo: {},
}

export const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
        setIsUser: (state, action) => {
            state.isUser = action.payload
        },
        setAccountInfo: (state, action) => {
            state.accountInfo = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setIsUser, setAccountInfo } = connectionSlice.actions
export default connectionSlice.reducer

import { createSlice } from '@reduxjs/toolkit';

export const SuccessTickerSlice = createSlice({
    name: 'SuccessTicker',
    initialState: {
        isOpen: false,
        title: '',
        body: ''
    },
    reducers: {
        openSuccessTicker: (state, action) => {
            state.isOpen = true;
            state.title = action?.payload?.title;
            state.body = action?.payload?.body;
        },
        closeSuccessTicker: (state) => {
            state.isOpen = false;
        },
    },
})

export const { openSuccessTicker, closeSuccessTicker } = SuccessTickerSlice.actions;
export default SuccessTickerSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

export const ErrorTickerSlice = createSlice({
    name: 'ErrorTicker',
    initialState: {
        isOpen: false,
        title: '',
        body: ''
    },
    reducers: {
        openTicker: (state, action) => {
            state.isOpen = true;
            state.title = action?.payload?.title;
            state.body = action?.payload?.body;
        },
        closeTicker: (state) => {
            state.isOpen = false;
        },
    },
})

export const { openTicker, closeTicker } = ErrorTickerSlice.actions;
export default ErrorTickerSlice.reducer;
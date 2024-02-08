import { createSlice } from '@reduxjs/toolkit';

export const logoutSlice = createSlice({
    name: 'logout',
    initialState: {
        isOpen: false
    },
    reducers: {
        open: (state) => {
            state.isOpen = true;
        },
        close: (state) => {
            state.isOpen = false;
        },
    },
})

export const { open, close } = logoutSlice.actions;
export default logoutSlice.reducer;
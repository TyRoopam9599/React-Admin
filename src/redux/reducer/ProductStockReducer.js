import { createSlice } from '@reduxjs/toolkit';

export const productStockSlice = createSlice({
    name: 'productStock',
    initialState: {
        isOpen: false,
        id: -1,
    },
    reducers: {
        open: (state) => {
            state.isOpen = true;
        },
        close: (state) => {
            state.isOpen = false;
        },
        setId: (state, action) => {
            state.id = action?.payload?.id;
        }
    },
})

export const { open, close, setId } = productStockSlice.actions;
export default productStockSlice.reducer;
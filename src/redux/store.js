import { configureStore } from '@reduxjs/toolkit';
import LogoutReducer from './reducer/LogoutReducer';
import LoginReducer from './reducer/LoginReducer';
import ErrorTickerReducer from './reducer/ErrorTickerReducer';
import SuccessTickerReducer from './reducer/SuccessTickerReducer';
import ProductStoreReducer from './reducer/ProductStockReducer';

export default configureStore({
  reducer: {
    logout: LogoutReducer,
    login: LoginReducer,
    ErrorTicker: ErrorTickerReducer,
    SuccessTicker: SuccessTickerReducer,
    productStock: ProductStoreReducer
  },
})
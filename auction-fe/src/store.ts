import {configureStore} from '@reduxjs/toolkit';
import authReducer from "./features/auth/auth.slice";
import {appApi} from "./api";
import {adminApi} from "./features/admin/admin.api";
import adminReducer from "./features/admin/admin.slice";

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    auth: authReducer,
    [adminApi.reducerPath]:appApi.reducer,
    authAdmin:adminReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware),
});

// export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

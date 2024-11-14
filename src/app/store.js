import { configureStore } from "@reduxjs/toolkit";
import { postsSlice } from "./redux/postsSlice";
import userReducer from "./redux/usersSlice";

export const store = configureStore({
    reducer: {
        [postsSlice.reducerPath]: postsSlice.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postsSlice.middleware),
});

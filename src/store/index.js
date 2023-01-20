import { configureStore } from "@reduxjs/toolkit";
import articleListSlice from "./articleListSlice";
import 'normalize.css';
import articleSlice from "./articleSlice";
import authSlice from "./authSlice";

const store = configureStore({
    reducer: {
        articleList: articleListSlice.reducer,
        article: articleSlice.reducer,
        auth: authSlice.reducer,
    }
})

export default store;
import { configureStore } from "@reduxjs/toolkit";
import articleListSlice from "./articleListSlice";
import 'normalize.css';

const store = configureStore({
    reducer: {
        articleList: articleListSlice.reducer,
    }
})

export default store;
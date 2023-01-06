import { configureStore } from "@reduxjs/toolkit";
import articleListSlice from "./articleListSlice";
import 'normalize.css';
import articleSlice from "./articleSlice";
import signUpSlice from "./forms/signUpSlice";

const store = configureStore({
    reducer: {
        articleList: articleListSlice.reducer,
        article: articleSlice.reducer,
        auth: signUpSlice.reducer,
    }
})

export default store;
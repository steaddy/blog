import {articleActions} from "./articleSlice";
import {articleListActions} from "./articleListSlice";

export const getArticle = slug => {


    return async (dispatch) => {

        const headers = localStorage.getItem('user') ? {

            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        } : {}

        const getData = async () => {
            const response = await fetch(
                `https://blog.kata.academy/api/articles/${slug}`, {
                    headers: headers,
                });
            if (!response.ok) {
                throw new Error('Could not get an article');
            }
            return response.json();
        };



        try {
            const articleData = await getData();
            dispatch(articleActions.getArticle(
                {article: articleData}));
        } catch (e) {
            console.log(e);
        }
    };


};
import { articleListActions } from "./articleListSlice";

export const getArticleList = (page) => {
    const limit = 10;   // Articles on page
    let offset = 0;

    if(page) offset = page * limit;

    const headers = localStorage.getItem('user') ?
        {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`} :
        {}

    return async (dispatch) => {
        const getData = async () => {
            const response = await fetch(
                `https://blog.kata.academy/api/articles/?limit=${limit}&offset=${offset}`,
                {
                    headers: headers
                });
            if (!response.ok) {
                throw new Error('Could not get an article list');
            }
            return response.json();
        };

        try {
            const articleListData = await getData();
            dispatch(articleListActions.getArticleList(
                {articleList: articleListData}));
        } catch (e) {
            console.log(e);
        }


    };
};



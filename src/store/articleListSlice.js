import {createSlice} from "@reduxjs/toolkit";
import ArticleListItem from "../components/ArticleListItem/ArticleListItem";
import React from "react";


const articleListSlice = createSlice({
    name: 'articleList',
    initialState: {
        articleList: [],
        total: 0,
    },
    reducers: {
        getArticleList(state, action) {

            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            const getUIDate = date => {
                const dateInMS = new Date(Date.parse(date));
                const month = monthNames[dateInMS.getMonth()];
                const day = dateInMS.getDate();
                const fullYear = dateInMS.getFullYear();
                return `${month} ${day}, ${fullYear}`;
            };

            state.total = action.payload.articleList.articlesCount;

            state.articleList = action.payload.articleList.articles.map(item => {
                return <ArticleListItem
                    key={item.slug}
                    title={item.title}
                    likes={item.favoritesCount}
                    body={item.body}
                    tagList={item.tagList}
                    image={item.author.image}
                    userName={item.author.username}
                    createdAt={getUIDate(item.createdAt)}
                />
            });
        }
    }
});

export const articleListActions = articleListSlice.actions;

export default articleListSlice;
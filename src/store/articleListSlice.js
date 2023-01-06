import {createSlice} from "@reduxjs/toolkit";
import ArticleListItem from "../components/ArticleListItem/ArticleListItem";
import React from "react";
import { getUIDate } from './../services/services';


const articleListSlice = createSlice({
    name: 'articleList',
    initialState: {
        articleList: [],
        total: 0,
    },
    reducers: {
        getArticleList(state, action) {


            state.total = action.payload.articleList.articlesCount;

            state.articleList = action.payload.articleList.articles.map(item => {
                return <ArticleListItem
                    key={item.slug}
                    slug={item.slug}
                    title={item.title}
                    likes={item.favoritesCount}
                    description={item.description}
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
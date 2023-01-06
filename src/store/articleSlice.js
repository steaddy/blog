import React from 'react';
import { createSlice } from "@reduxjs/toolkit";
import { getUIDate } from './../services/services';
import ArticleListItem from "../components/ArticleListItem";
import Article from "../components/Article/Article";
/*
const articleTransform = item => {
    return (
        <Article
            key={item.slug}
            title={item.title}
            likes={item.favoritesCount}
            description={item.description}
            body={item.body}
            tagList={item.tagList}
            image={item.author.image}
            userName={item.author.username}
            createdAt={getUIDate(item.createdAt)}
        />
    );
};*/

const articleSlice = createSlice({
    name: 'article',
    initialState: {article: {
        tagList: [],
            likes: 0,
            author: {
            image: null
            }
        }},
    reducers: {
        getArticle(state, action) {
            state.article = action.payload.article.article;
        },
    }
});

export const articleActions = articleSlice.actions;

export default articleSlice;
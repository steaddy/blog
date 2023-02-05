import React from 'react';
import Header from "../Header";
import UserPostInfo from "../UserPostInfo";
// @ts-ignore
import classes from "./App.module.css";
import {useDispatch, useSelector} from "react-redux";
import ArticleListItem from "../ArticleListItem/ArticleListItem";
import {getArticleList} from "../../store/articleListActions";
import ArticleList from "../ArticleList";
import Paginator from "../Paginator";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Article from "../Article/Article";
import {getArticle} from "../../store/articleActions";
import SignIn from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";
import EditUserInfo from "../../pages/EditUserInfo/EditUserInfo";
import NewArticle from "../../pages/NewArticle";


function App() {
/*

    const dispatch = useDispatch();
    let articleList = useSelector(state => state.articleList.articleList);
    let article = useSelector(state => state.article.article);
*/


    return (
        <div className={classes.app}>
            <div className={classes["main-container"]}>
                <Header/>
                    <Routes>
                        <Route path='/'  element={<ArticleList/>}/>
                        <Route path='articles' element={<ArticleList/>}/>
                        <Route path='/articles/:slug' element={<Article/>}/>
                        <Route path='/sign-in' element={<SignIn/>}/>
                        <Route path='/sign-up' element={<SignUp/>}/>
                        <Route path='/profile' element={<EditUserInfo/>}/>
                        <Route path='/new-article' element={<NewArticle/>}/>
                        <Route path='/articles/:slug/edit' element={<NewArticle/>}/>
                    </Routes>
            </div>
        </div>
    );
}

export default App;

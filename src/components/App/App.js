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


function App() {

    const userName = 'Bob';
    const postTime = 'March, 5, 2020';

    const dispatch = useDispatch();
    let articleList = useSelector(state => state.articleList.articleList);

    console.log(articleList);

    const getArticleListHandler = () => {
        dispatch(getArticleList());
    };

    return (
        <div className={classes.app}>
            <div className={classes["main-container"]}>
                <Header/>
                <ArticleList/>

                {/* <UserPostInfo userName={userName} postTime={postTime}/>*/}


                <button onClick={getArticleListHandler}>Get List of Articles</button>

            </div>
        </div>
    );
}

export default App;

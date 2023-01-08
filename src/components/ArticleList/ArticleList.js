import React, {useEffect} from 'react';
import classes from './ArticleList.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getArticleList} from "../../store/articleListActions";
import 'antd/dist/antd.css';
import Paginator from "../Paginator";

const ArticleList = () => {
    const dispatch = useDispatch();
    const { articleList, total } = useSelector(state => state.articleList);

    const onPageChangeHandler = page => {
        dispatch(getArticleList(page));
    };

    useEffect(() => {
        dispatch(getArticleList());
    }, [])

    return (
        <>
            <div className={classes['article-list']}>{articleList}</div>

            <Paginator total={total} onPageChange={onPageChangeHandler}/>
        </>
    );
};

export default ArticleList;
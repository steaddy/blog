import React, {useEffect} from 'react';
import classes from './ArticleList.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getArticleList} from "../../store/articleListActions";
import 'antd/dist/antd.css';
import Paginator from "../Paginator";
import ArticleListItem from "../ArticleListItem";
import {v4} from 'uuid'

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
            <div className={classes['article-list']}>{
                articleList.map(item => {
                    return <ArticleListItem
                        key={v4()}
                        slug={item.slug}
                        title={item.title}
                        likes={item.favoritesCount}
                        description={item.description}
                        tagList={item.tagList}
                        image={item.image}
                        userName={item.userName}
                        favorited={item.favorited}
                        createdAt={item.createdAt}
                    />
                })
            }</div>

            <Paginator total={total} onPageChange={onPageChangeHandler}/>
        </>
    );
};

export default ArticleList;
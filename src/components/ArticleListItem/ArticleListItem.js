import React from "react";
import classes from './ArticleListItem.module.css';
import {Link} from "react-router-dom";
import Likes from "../Likes/Likes";
import {useDispatch} from "react-redux";
import {getArticleList} from "../../store/articleListActions";

const ArticleListItem = ({
                             slug,
                             title,
                             likes = 0,
                             description,
                             tagList,
                             image,
                             userName,
                             createdAt,
                             favorited
                         }) => {

const dispatch = useDispatch();

    const likesHandler = async () => {
            await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
                method: favorited ? 'DELETE' : 'POST',
                body: JSON.stringify({slug: slug}),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${JSON.parse( await localStorage.getItem('user')).token}`
                }
            })
        dispatch(getArticleList());
    };


    return (
        <div key={slug} className={classes['list-item']}>
            <div className={classes['article-info']}>


                <div className={classes['title-block']}>
                    <h5 className={classes.title}><Link to={`/articles/${slug}`}>{title}</Link></h5>







                    <span onClick={likesHandler} className={classes['likes-block']}>
                         <Likes
                             favorited={favorited}
                             slug={slug}
                         />

                        <span className={classes.likes}>{likes}</span>
                    </span>






                </div>


                <div className={classes.tags}>
                    {tagList.map(tag => {
                        if (!tag) return;
                        return <span className={classes.tag}>{tag}</span>;
                    })}
                </div>


                <p className={classes['article-description']}>
                    {description}
                </p>
            </div>

            <div className={classes['user-info']}>
                <div className={classes['username-and-date-block']}>
                    <div className={classes.username}><h6>{userName}</h6></div>
                    <div className={classes.date}>{createdAt}</div>
                </div>
                <img className={classes.photo} src={image} alt="User Photo"/>
            </div>

        </div>
    );
};

export default ArticleListItem;
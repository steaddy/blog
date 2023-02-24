import React, {useEffect} from "react";
import classes from './Article.module.css';
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getArticle} from "../../store/articleActions";
import {getUIDate} from "../../services/services";
import {Popconfirm, message} from "antd";
import Likes from "../Likes/Likes";
import {v4} from "uuid";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import {toast} from "react-toastify";
import ReactMarkdown from 'react-markdown'

const Article = () => {

    const {slug} = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const art = useSelector(state => state.article.article);
    const currentUser = useSelector(state => state.auth.user?.username);


    useEffect(() => {
        dispatch(getArticle(slug));
    }, [])

    const cancel = e => {
        /*message.error('Click on no');*/
    };

    const deleteArticle = async () => {

        /*message.success('The Article has been deleted');*/
        try {
            const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
                method: 'DELETE',
                body: JSON.stringify({slug: slug}),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                }
            });
            if (res.ok) {
                toast.success('The Article has been deleted', {
                    position: toast.POSITION.TOP_RIGHT,
                })
            }
        } catch (e) {
            console.log('Error: ', e.message)
        }
        navigate('/');
    };


    const likesHandler = async () => {
        try {
            const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
                method: art.favorited ? 'DELETE' : 'POST',
                body: JSON.stringify({slug: slug}),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                }
            });
        } catch (e) {
            console.log(e.message);
        }
        dispatch(getArticle(slug));
    };


    return (

        <ErrorBoundary>


            <div className={classes['article-wrapper']}>
                <div className={classes['article']}>


                    <div className={classes['article-header']}>

                        <div>

                            <div className={classes['title-block']}>
                                <h5 className={classes.title}>{art.title}</h5>


                                <span
                                    onClick={likesHandler} className={classes['likes-block']}>


                             <Likes
                                 favorited={art.favorited ? art.favorited : false}
                                 slug={slug}
                             />

        <span className={classes.likes}>{art.favoritesCount}</span>




                    </span>
                            </div>


                            <div className={classes.tags}>
                                {art.tagList.map(tag => {
                                    if (!tag) return;
                                    return <span key={v4()} className={classes.tag}>{tag}</span>;
                                })}
                            </div>

                            <p className={classes['article-description']}>
                                {art.description}
                            </p>

                        </div>


                        <div className={classes['config-block']}>

                            <div className={classes['user-info']}>
                                <div className={classes['username-and-date-block']}>
                                    <div className={classes.username}><h6>{art.author.username}</h6></div>
                                    <div className={classes.date}>{getUIDate(art.createdAt)}</div>
                                </div>
                                <img className={classes.photo} src={art.author.image} alt="User Photo"/>
                            </div>


                            {art.author.username === currentUser ? (
                                <div className={classes['article-buttons']}>

                                    <Popconfirm
                                        placement='rightTop'
                                        title='Delete Article'
                                        description='Are you sure you want to delete this article?'
                                        onCancel={cancel}
                                        onConfirm={deleteArticle}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <button
                                            className={classes['delete-button']}
                                        >Delete
                                        </button>
                                    </Popconfirm>

                                    <NavLink
                                        to={`/articles/${slug}/edit`}
                                        className={classes['edit-button']}
                                    >Edit</NavLink>
                                </div>
                            ) : null
                            }


                        </div>


                    </div>

                        <p className={classes['article-body']}>
                            <ReactMarkdown>
                                {art.body}
                            </ReactMarkdown>
                        </p>
                </div>


            </div>

        </ErrorBoundary>
    );
};

export default Article;
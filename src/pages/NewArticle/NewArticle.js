import React from "react";
import classes from "./NewArticle.module.css";
import TagItem from "../../components/TagItem/TagItem";

const NewArticle = () => {


    return (
        <div className={classes['article-wrapper']}>
            <div className={classes['article']}>
                <h1>Create New Article</h1>

                <form onSubmit={() => {

                }}>

                    <div className={classes['input-block']}>
                        <label htmlFor="title" className={classes['form-label']}>Title</label>
                        <input

                            onChange={() => {
                            }}
                            id='title'
                            type="text"
                            placeholder='Title' className={classes['form-input']}
                        />
                    </div>

                    <div className={classes['input-block']}>
                        <label htmlFor="title" className={classes['form-label']}>Short Description</label>
                        <input

                            onChange={() => {
                            }}
                            id='description'
                            type="text"
                            placeholder='Short Description' className={classes['form-input']}
                        />
                    </div>

                    <div className={classes['input-block']}>
                        <label htmlFor="title" className={classes['form-label']}>Text</label>
                        <textarea

                            onChange={() => {
                            }}
                            id={classes['article-text']}
                            placeholder='Text'
                            className={classes['form-input']}
                        />

                        <label className={classes["tag-block-label"]}>Tags</label>
                        {/*<TagItem tag='Tag One'/>*/}
                        <div className={classes["tag-input-block"]}>
                            <input
                                className={classes["tag-input"]}
                                placeholder='Tag'
                            />
                            <button className={classes["tag-delete-btn"]}>Delete</button>
                            <button className={classes["tag-add-btn"]}>Add teg</button>
                        </div>
                    </div>

                    <input
                        className={classes['submit-button']}
                    type='submit'
                        value='Send'
                    />

                </form>
            </div>
        </div>
    );
};

export default NewArticle;
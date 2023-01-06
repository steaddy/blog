import React from "react";
import classes from "./NewArticle.module.css";

const NewArticle = () => {


    return (
        <div>
            <h1>Create New Article</h1>

            <form onSubmit={}>

                <div className={classes['input-block']}>
                    <label htmlFor="title" className={classes['form-label']}>Title</label>
                    <input
                        value={}
                        onChange={}
                        id='title'
                        type="text"
                        placeholder='Title' className={classes['form-input']}
                    />
                </div>
            </form>
        </div>
    );
};

export default NewArticle;
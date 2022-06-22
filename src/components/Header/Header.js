import React from 'react';
import classes from "./Header.module.css";

export default () => {
    return (
        <div className={classes.header}>
            <div className={classes['blog-name']}><h6>Realworld Blog</h6></div>
            <div className={classes['button-block']}>
                <button className={classes['sign-in-btn']}>Sign In</button>
                <button className={classes['sign-up-btn']}>Sign Up</button>
            </div>
        </div>
    );
}
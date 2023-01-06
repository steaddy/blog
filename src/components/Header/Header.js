import React from 'react';
import classes from "./Header.module.css";
import {Link} from "react-router-dom";

export default () => {
    return (
        <div className={classes.header}>
            <div className={classes['blog-name']}><h6><Link to='/'> Realworld Blog</Link></h6></div>
            <div className={classes['button-block']}>
                <button className={classes['sign-in-btn']}><Link to='/sign-in' >Sign In</Link></button>
                <button className={classes['sign-up-btn']}><Link to='/sign-up' >Sign Up</Link></button>
            </div>
        </div>
    );
}
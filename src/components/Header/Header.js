import React from 'react';
import classes from "./Header.module.css";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../../store/forms/authSlice";

export default () => {

    const {user} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
        navigate('/');
    };


    return (
        <div className={classes.header}>
            <div className={classes['blog-name']}>
                <h6><Link to='/'> Realworld Blog</Link></h6>
            </div>


            <div className={classes['button-block']}>

                {user ? (
                    <>
                        <div className={classes['user-info']}>
                            <div className={classes['user-name']}>{user.username}</div>
                            <div className={classes['user-icon']}>Icon</div>
                        </div>
                        <button onClick={onLogout} className={[classes['btn'], classes['logout'],].join(' ')}>Log Out</button>
                    </>
                ) : (
                    <>
                        <NavLink
                            to='/sign-in'
                            className={({isActive}) => isActive ? classes['active'] : classes['btn']}
                        >Sign In</NavLink>
                        <NavLink
                            className={({isActive}) => isActive ? classes['active'] : classes['btn']}
                            to='/sign-up'
                        >Sign Up</NavLink>
                    </>
                )}

            </div>
        </div>
    );
}
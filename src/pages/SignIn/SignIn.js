import React, {useEffect, useRef, useState} from "react";
import classes from './SignIn.module.css';
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authActions, loginUser} from "../../store/authSlice";
import Spinner from "../../components/Spinner";

const SignIn = () => {

    const {register, formState: {errors}, handleSubmit} = useForm({
        mode: "onBlur"
    });


    const dispatch = useDispatch();

    const navigate = useNavigate();


    const auth = useSelector(state => state.auth);



    useEffect(() => {
        if (auth.isSuccess || auth.user) {
            navigate('/');
        }
        dispatch(authActions.reset())
    }, [auth.isSuccess])




    const onSubmit = data => {
        dispatch(loginUser(data));
    };
    if (auth.isLoading) {
        return <Spinner/>
    }


    return (
        <div className={classes['sign-in-wrapper']}>
            <div className={classes['sign-in-form']}>
                <h6 className={classes['sign-in-header']}>Sign In</h6>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className={classes['input-block']}>
                        <label htmlFor="email" className={classes['form-label']}>Email address</label>
                        <input
                            {...register('email', {
                                required: "Enter email",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: 'Enter email correctly'
                                }
                            })}
                            id='email'
                            type="email"
                            placeholder='Email address'
                            className={classes['form-input']}
                        />




                        <div>
                            <p className={classes['input-error']}>
                                {errors['email'] && errors['email']?.message}
                            </p>
                        </div>
                    </div>





                    <div className={classes['input-block']}>
                        <label htmlFor="password" className={classes['form-label']}>Password</label>
                        <input
                            {...register('password', {
                                required: "Enter password",
                                minLength: {
                                    value: 6,
                                    message: 'Password should be longer than 6 characters'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Password should be less than 20 characters'
                                },
                            })
                            }
                            id='password'
                            type="password"
                            placeholder='Password'
                            className={`${classes['form-input']}`}
                        />
                    </div>

                    <div>
                        <p className={classes['input-error']}>
                            {errors['password'] && errors['password']?.message}
                        </p>
                    </div>

                    <input type='submit' className={classes['login-button']} value='Login'/>

                    <div className={classes['dont-have-acc-element']}>
                        <span>Don’t have an account? <span><Link to='/sign-up'>Sign Up.</Link></span></span>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default SignIn;
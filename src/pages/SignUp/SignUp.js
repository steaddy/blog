import React, {useEffect, useState} from 'react';
import './SignUp.module.css';
import {Link, useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form';
import classes from './SignUp.module.css'
import {useSelector, useDispatch} from "react-redux";
import {registerNewUser, authActions} from "../../store/authSlice";
import Spinner from "../../components/Spinner";

const SignUp = props => {

    const {isSuccess, isLoading, isError} = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
        dispatch(authActions.reset())
    }, [isSuccess, isLoading, isError, dispatch, navigate])

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset,
    } = useForm({mode: "onBlur"});

    const onSubmit = data => {
        dispatch(registerNewUser(data));
        // reset();
    };


    if (isLoading) {
        return <Spinner/>
    }


    return (
        <div className={classes['sign-in-wrapper']}>
            <div className={classes['sign-in-form']}>
                <h6 className={classes['sign-in-header']}>Sign Up</h6>

                <form onSubmit={handleSubmit(onSubmit)}>


                    {/* User Name input */}

                    <div className={classes['input-block']}>
                        <label className={classes['form-label']}>Username
                            <input
                                {...register('username', {
                                    required: 'You should enter user name',
                                    minLength: {
                                        value: 3,
                                        message: 'Name should be longer than 3 characters'
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: 'Name should be less than 20 characters'
                                    },
                                })
                                }
                                type="text"
                                placeholder='User Name' className={classes['form-input']}
                            />
                        </label>
                        <div>
                            <p className={classes['input-error']}>
                                {errors['username'] && errors['username']?.message}
                            </p>
                        </div>
                    </div>


                    {/*Email input*/}

                    <div className={classes['input-block']}>
                        <label htmlFor="email" className={classes['form-label']}>Email address</label>
                        <input
                            {...register('email',
                                {
                                    required: 'Enter Email'
                                })
                            }
                            id='email'
                            type="email"
                            placeholder='Email address'
                            className={classes['form-input']}
                        />
                        <div>
                            <p className={classes['input-error']}>{errors['email'] && errors['email']?.message}</p>
                        </div>
                    </div>


                    {/*Password input*/}

                    <div className={classes['input-block']}>
                        <label htmlFor="password" className={classes['form-label']}>Password</label>
                        <input
                            {...register('password')}
                            id='password'
                            type="password" placeholder='Password'
                            className={`${classes['form-input']} ${true ? '' : classes.invalid}`}
                        />
                        {false &&
                        <p className={classes['input-error']}>Your password needs to be at least 6 characters.</p>}
                    </div>


                    {/*Repeat password*/}

                    <div className={classes['input-block']}>
                        <label htmlFor="password" className={classes['form-label']}>Repeat password</label>
                        <input
                            id='repeat-password'
                            type="password"
                            placeholder='Repeat password'
                            className={`${classes['form-input']} ${true ? '' : classes.invalid}`}
                        />
                        {false &&
                        <p className={classes['input-error']}>Your password needs to be at least 6 characters.</p>}
                    </div>

                    <button className={classes['sign-up-button']}>Create</button>

                    <div className={classes['dont-have-acc-element']}>
                        <span>Already have an account? <span><Link to='/sign-in'>Sign In.</Link></span></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;


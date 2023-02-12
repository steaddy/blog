import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useForm} from 'react-hook-form';
import classes from './EditUserInfo.module.css';
import {useSelector, useDispatch} from "react-redux";
import {registerNewUser, authActions, editUserInfo} from "../../store/authSlice";
import Spinner from "../../components/Spinner";

const EditUserInfo = props => {

    let {user, isSuccess, isLoading, isError} = useSelector(state => state.auth);



    const {username, email, image} = user;



    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        /*if (isSuccess) {
            navigate('/');
        }*/
        dispatch(authActions.reset())
    }, [])

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset,
    } = useForm({mode: "onBlur"});

    const onSubmit = data => {
        dispatch(editUserInfo(data));
        reset();
        navigate('/')
    };


    if (isLoading) {
        return <Spinner/>
    }


    return (
        <div className={classes['sign-in-wrapper']}>
            <div className={classes['sign-in-form']}>
                <h6 className={classes['sign-in-header']}>Edit Profile</h6>

                <form onSubmit={handleSubmit(onSubmit)}>


                    {/* User Name input */}

                    <div className={classes['input-block']}>
                        <label className={classes['form-label']}>Username
                            <input
                                defaultValue={username}
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
                                placeholder='User Name'
                                className={`${classes['form-input']} ${!errors['username'] ? '' : classes.invalid}`}
                            />
                        </label>
                        <div>
                            <p className={classes['input-error']}>{errors['username'] && errors['username']?.message}</p>
                        </div>
                    </div>


                    {/*Email input*/}

                    <div className={classes['input-block']}>
                        <label htmlFor="email" className={classes['form-label']}>Email address</label>
                        <input
                            defaultValue={email}
                            {...register('email',
                                {
                                    required: 'Enter Email',
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: 'Enter correct email address'
                                    }
                                })
                            }
                            id='email'
                            type="email"
                            placeholder='Email address'
                            className={`${classes['form-input']} ${!errors['email'] ? '' : classes.invalid}`}
                        />
                        <div>
                            <p className={classes['input-error']}>{errors['email'] && errors['email']?.message}</p>
                        </div>
                    </div>


                    {/* New Password input */}

                    <div className={classes['input-block']}>
                        <label htmlFor="password" className={classes['form-label']}>New Password</label>
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
                            type="password" placeholder='Password'
                            className={`${classes['form-input']} ${!errors['password'] ? '' : classes.invalid}`}
                        />

                        <div>
                            <p className={classes['input-error']}>
                                {errors['password'] && errors['password']?.message}
                            </p>
                        </div>


                    </div>


                    {/* Logo URL */}

                    <div className={classes['input-block']}>
                        <label htmlFor="logo" className={classes['form-label']}>Avatar Image (URL)</label>
                        <input
                            {...register('image', {
                                pattern: {
                                    value: /^((http|https):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,

                                    message: 'Enter URL address'
                                }
                            })}
                            defaultValue={image}
                            id='logo'
                            type="url"
                            placeholder='http://address.ex/logo.png'
                            className={`${classes['form-input']} ${!errors['logo'] ? '' : classes.invalid}`}
                        />

                        <div>
                            <p className={classes['input-error']}>
                                {errors['logo'] && errors['logo']?.message}
                            </p>
                        </div>

                    </div>

                    <button className={classes['sign-up-button']}>Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditUserInfo;


import React, {useRef, useState} from "react";
import classes from './SignIn.module.css';
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../store/forms/signUpSlice";

const SignIn = () => {

    const {register, formState: {errors}, handleSubmit} = useForm();

    const [emailInput, setEmailInput] = useState('');

    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);

/*

    // Testing


    const signInFormHandler = async data => {

        const response = await fetch(`https://blog.kata.academy/api/users/login`, {
            method: 'POST',
            headers: {

                'content-type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    email: data.email,
                    password: data.password,
                }
            })
        });

        const answer = await response.json();

        console.log(answer);
    };
*/

    const onSubmit = data => {
        dispatch(loginUser(data));
    };


    return (
        <div className={classes['sign-in-wrapper']}>
            <div className={classes['sign-in-form']}>
                <h6 className={classes['sign-in-header']}>Sign In</h6>
                <h2>{`Hi, ${auth.user.name}`}</h2>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className={classes['input-block']}>
                        <label htmlFor="email" className={classes['form-label']}>Email address</label>
                        <input
                            {...register('email', {required: true, pattern: {value: /@/g, message: 'Enter email correctly'}})}
                            value={emailInput}
                            onChange={event => setEmailInput(event.target.value)}
                            id='email'
                            type="email"
                            placeholder='Email address'
                            className={classes['form-input']}
                        />
                    </div>

                    <div className={classes['input-block']}>
                        <label htmlFor="password" className={classes['form-label']}>Password</label>
                        <input
                            {...register('password')}
                            id='password'
                            type="password"
                            placeholder='Password'
                            className={`${classes['form-input']}`}
                        />
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
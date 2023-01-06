import React, {useState} from 'react';
import './SignUp.module.css';
import {Link} from "react-router-dom";
import {useForm} from 'react-hook-form';
import classes from './SignUp.module.css'
import {useSelector, useDispatch} from "react-redux";
import {enterEmail, enterUserName} from "../../store/forms/signUpActions";
import {registerNewUser} from "../../store/forms/signUpSlice";

const SignUp = props => {

    const { name, email } = useSelector(state => state.auth.user);

    const dispatch = useDispatch();

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

/*
    const [emailInput, setEmailInput] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(true);*/
    /*

        const signInFormHandler = e => {
            e.preventDefault();
            console.log();
        };
    */
/*
    const passwordValidator = e => {
        e.target.value.length < 6 ? setPasswordIsValid(false) : setPasswordIsValid(true);
    };*/

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
                            <p className={classes['input-error']}>{errors['username'] && errors['username']?.message}</p>
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

                    <button className={classes['sign-up-button']} >Create</button>

                    <div className={classes['dont-have-acc-element']}>
                        <span>Already have an account? <span><Link to='/sign-in'>Sign In.</Link></span></span>
                    </div>
                </form>
                <div>Name: {name}</div>
                <div>Email: {email}</div>
                <div>{errors['user-name'] && <p>Ошибка в юзер-нэйм: {errors['user-name']?.message}</p>}</div>










                <button onClick={async ()=>{

                    let user = {
                        user: {
                            username: "Name99",
                            email: "email99@mail.ru",
                            password: "password99"
                        }
                    };

                    let response = await fetch(`https://blog.kata.academy/api/users/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)

                    });
                    if(response.ok) {
                        console.log('ok');
                    } else {
                        console.log('The Error is: ' + response.status);
                    }
                    console.log(await response.json())
                }}>Create a user</button>



                <button onClick={async ()=>{

                    let user = {
                        user: {
                            email: "email99@mail.ru",
                            password: "password99"
                        }
                    };

                    let response = await fetch(`https://blog.kata.academy/api/users/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)

                    });
                    if(response.ok) {
                        console.log('ok');
                    } else {
                        console.log('The Error is: ' + response.status);
                    }
                    console.log(await response.json())
                }}>Log In</button>










            </div>
        </div>
    );
};

export default SignUp;


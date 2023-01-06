import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// Register a new user
export const registerNewUser = createAsyncThunk('auth/registerNewUser',
    async (user, {
        rejectWithValue,
        dispatch
    }) => {
        console.log(user);
        const res =  await axios.post(`https://blog.kata.academy/api/users`, {

                "user": {
                    "username": user.username,
                    "email": user.email,
                    "password": user.password,
                }

        }

    )

        console.log(res.data);
    }
)

// Login user
export const loginUser = createAsyncThunk('auth/loginUser',
    async (user, {
        thunkAPI,
        dispatch
    }) => {
        console.log(user.email);
        console.log(user.password);
        const res =  await axios.post(`https://blog.kata.academy/api/users/login`, {

                "user": {

                    "email": user.email,
                    "password": user.password
                }

            }

        )

        console.log(res.data);
    }
)

const signUpSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            name: 'no name',
            email: 'no email',
        },
        isLoading: false,
        isSuccess: false,
        isError: false,
    },
    reducers: {},
    extraReducers: builder => {

    }
});

export const signUpActions = signUpSlice.actions;

export default signUpSlice;
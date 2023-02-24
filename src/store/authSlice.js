import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
};


// Register a new user
export const registerNewUser = createAsyncThunk('auth/registerNewUser',
    async (user, {thunkAPI, dispatch}) => {
        try {
            const res = await axios.post(`https://blog.kata.academy/api/users`, {

                    "user": {
                        "username": user.username,
                        "email": user.email,
                        "password": user.password,
                    }
                }
            );


            await console.log('Data', res.data)
            console.log(res)

            if (res.data) {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                return res.data;
            }
        } catch (e) {
            if(e.response.data.errors['username']) {
                toast.error('Username is taken', {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            if(e.response.data.errors['email']) {
                toast.error('Email is taken', {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            return thunkAPI.rejectWithValue(e)
        }


    }
)


// Login user
export const loginUser = createAsyncThunk('auth/loginUser',
    async (user, {
        thunkAPI,
        dispatch
    }) => {
        try {
            const res = await axios.post(`https://blog.kata.academy/api/users/login`, {
                    "user": {
                        "email": user.email,
                        "password": user.password
                    }
                }
            )

            if (res.data) {
                localStorage.setItem('user', JSON.stringify(res.data.user));



                return res.data;
            }
        } catch (e) {
            if(e.response.data.errors) {
                toast.error('Email or password is invalid', {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            return thunkAPI.rejectWithValue(e)
        }
    }
)


// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    await localStorage.removeItem('user');
});






// Edit User Info
export const editUserInfo = createAsyncThunk('auth/editUserInfo',
    async (user, {
        thunkAPI,
        dispatch
    }) => {
        try {
            const res = await fetch('https://blog.kata.academy/api/user', {
                method: 'PUT',
                body: JSON.stringify({
                    user: {
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        image: user.image,
                    }
                }),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                }

            })

            const data = await res.json();


            if (res.ok) {
                localStorage.setItem('user', JSON.stringify(data.user));
                toast.success('Personal data has been changed', {
                    position: toast.POSITION.TOP_RIGHT,
                })
                return data;
            } else {
                toast.error('Email or name is already in use, try another', {
                    position: toast.POSITION.TOP_RIGHT
                })
            }









        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)



const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        reset: state => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(registerNewUser.pending, state => {
                state.isLoading = true;
                console.log('Pending')
            })
            .addCase(registerNewUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                console.log('Fulfilled')
                console.log(action.payload)
            })
            .addCase(registerNewUser.rejected,
                (state,action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                console.log('Rejected')














            })
            .addCase(loginUser.pending, state => {
                state.isLoading = true;
                console.log('Pending')
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                console.log('Fulfilled')
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                console.log('Rejected')
                console.log(action.payload)
            })
            .addCase(editUserInfo.pending, state => {
                state.isLoading = true;
                console.log('Pending')
            })
            .addCase(editUserInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                console.log('Fulfilled')
            })
            .addCase(editUserInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.log('Rejected')
            })
            .addCase(logout.fulfilled, state => {
                state.user = null;
            })
    }
});

export const authActions = authSlice.actions;

export default authSlice;
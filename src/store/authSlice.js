import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

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
    async (user, {
        thunkAPI,
        dispatch
    }) => {
        try {
            const res = await axios.post(`https://blog.kata.academy/api/users`, {

                    "user": {
                        "username": user.username,
                        "email": user.email,
                        "password": user.password,
                    }
                }
            )


            if (res.data) {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                return res.data;
            }
        } catch (e) {
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

                console.log(res.data)


                return res.data;
            }
        } catch (e) {
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


  /*

            const res = await axios.put({
                url: `https://blog.kata.academy/api/user`,
                method: 'PUT',
                data: {
                    "user": {
                        "email": user.email,
                        "password": user.password
                    }
                },
                headers: {Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTgzNTQxMjA3NTk0MWIwMGU0NzcyMiIsInVzZXJuYW1lIjoiam9zZSIsImV4cCI6MTY3ODUyMDk3OCwiaWF0IjoxNjczMzM2OTc4fQ.Qs9cfei_EGahobQGXsYwZo1aOmgXPKwjESIX58EjaPA`}
            })

    */


            const res = await fetch('https://blog.kata.academy/api/user', {
                method: 'PUT',
                body: JSON.stringify({
                    user: {
                        username: user.username,
                        email: user.email,
                        password: user.password,
                    }
                }),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                }

            })


            const data = await res.json();
            console.log(data);


            if (res.ok) {
                localStorage.setItem('user', JSON.stringify(data));
                return data;
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
            .addCase(registerNewUser.rejected, state => {
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
                console.log(state)
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
                console.log(state)
            })
            .addCase(editUserInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.log('Rejected')
                console.log(action.error)
            })
            .addCase(logout.fulfilled, state => {
                state.user = null;
            })
    }
});

export const authActions = authSlice.actions;

export default authSlice;
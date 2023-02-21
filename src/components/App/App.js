import React from 'react';
import Header from "../Header";
import classes from "./App.module.css";
import ArticleList from "../ArticleList";
import { Routes, Route } from 'react-router-dom';
import Article from "../Article/Article";
import SignIn from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";
import EditUserInfo from "../../pages/EditUserInfo/EditUserInfo";
import NewArticle from "../../pages/NewArticle";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {


    return (
        <div className={classes.app}>
            <div className={classes["main-container"]}>
                <ToastContainer autoClose={10000}/>
                <Header/>
                    <Routes>
                        <Route path='/'  element={<ArticleList/>}/>
                        <Route path='articles' element={<ArticleList/>}/>
                        <Route path='/articles/:slug' element={<Article/>}/>
                        <Route path='/sign-in' element={<SignIn/>}/>
                        <Route path='/sign-up' element={<SignUp/>}/>
                        <Route path='/profile' element={<PrivateRoute><EditUserInfo/></PrivateRoute>}/>
                        <Route path='/new-article' element={<PrivateRoute><NewArticle/></PrivateRoute>}/>
                        <Route path='/articles/:slug/edit' element={<PrivateRoute><NewArticle/></PrivateRoute>}/>
                    </Routes>
            </div>
        </div>
    );
}

export default App;

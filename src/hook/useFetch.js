import React, {useEffect} from 'react'
import {useSelector} from "react-redux";

const useFetch = () => {


    const token = useSelector(state => state.auth.user?.token)
    const headers = token ? {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`} : {}


    const fetchNow = async (url, options) => {

try {
    const res = await fetch(url, {
        method: options.method ? options.method : 'POST',
        body: options.body ? JSON.stringify(options.body) : null,
        headers: headers
    });
    const data = await res.json();
    return data;
} catch (e) {
    console.log(e.message)
}

    }

return fetchNow;

}

export default useFetch

import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from "../context";
import LoginForm from "./../components/Login/LoginForm";
import AuthService from "./../API/AuthService"
import {useFetching} from "./../hooks/useFetching"

import axios from "axios";

const Login = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFailImgMustShake, setIsFailImgMustShake] = useState(false)
    const [isUserFetching, setIsUserFetching] = useState(false)



     function handleSubmit(event) {
       event.preventDefault();

       const authFetchUser = async () => {
         try {
           setIsUserFetching(true);
           const response = await AuthService.athenticate(email, password);
            localStorage.setItem("token", response.headers['authorization']);
            localStorage.setItem('user_id',response.data.status.id )
            localStorage.setItem('auth', 'true')
            setIsAuth(true)
         } catch (e) {
           setIsFailImgMustShake(true)
         } finally {
           setIsUserFetching(false)
         }
       }

       authFetchUser()

     }

     // to prevent Can't perform React state update of unmounted component
     useEffect(()=>{

        return ()=> setIsUserFetching(false)
     },
     [])

    return (
        <LoginForm handleSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isFailImgMustShake = {isFailImgMustShake}
        setIsFailImgMustShake = {setIsFailImgMustShake}
        isUserFetching = { isUserFetching }
         />
    );
};

export default Login;

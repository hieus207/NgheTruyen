import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '../api';
import { userSlice } from '../redux/reducers/userSlice';
import { userState } from '../redux/selectors';

const useAuth = () => {
    const [accessToken, setAccessToken] = useState()
    const _user = useSelector(userState)
    const dispatch = useDispatch()
    useEffect(()=>{
        let loop
        const user = localStorage.getItem("user") !== undefined ? JSON.parse(localStorage.getItem("user")) : null
        if(!_user.isLoggedIn){
            // REMEMBER LOGIN
            if(user && user.exp && user.exp > (Date.now()/1000).toFixed()){
                dispatch(userSlice.actions.loggedIn(user))

            }
        }else{
            if(user){
                setAccessToken(user.accessToken)
            }
            let duration = user.exp-(Date.now()/1000).toFixed()
            loop = setInterval(()=>{
                refreshToken({token: user.refreshToken}).then(res => {
                    localStorage.setItem("user",JSON.stringify({...user, accessToken: res.data.accessToken, exp: res.data.exp}))
                    setAccessToken(res.data.accessToken)
                    duration = (res.data.exp - (Date.now()/1000)).toFixed()
                }).catch(error=>console.log(error))
                // CATCH DANG NHAP LAI
                
            },(duration>10?duration-10:0)*1000)
        }
        return ()=>{
            clearInterval(loop)
        }
    },[dispatch,_user.isLoggedIn])

    useEffect(()=>{
        axios.defaults.headers.post['Authorization'] = "Bearer " + accessToken
        axios.defaults.headers.put['Authorization'] = "Bearer " + accessToken
        axios.defaults.headers.delete['Authorization'] = "Bearer " + accessToken
    },[accessToken])

  return [_user.data , _user.isLoggedIn]
};

export default useAuth;
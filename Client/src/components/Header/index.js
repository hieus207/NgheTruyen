// import {Link } from "react-router-dom"
import styles from "./header.module.scss"
import useModal from "../../hooks/useModal";
import Modal from "../helpers/Modal";
import clsx from "clsx"
import Link from "../helpers/Link";
import Button from "../helpers/Button";
import LoginForm from "../helpers/LoginForm";
import SearchForm from "../helpers/SearchForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {allCategoriesState, categoriesState, categorySuccessState, userState} from "../../redux/selectors"
import { refreshToken } from "../../api";
import ProfileCard from "../helpers/ProfileCard";
import { userSlice } from "../../redux/reducers/userSlice";
import HoverScrollBtn from "../helpers/HoverScrollBtn";
import { categorySlice } from "../../redux/reducers/categorySlice";
export default function Header(){
    const {isShowing, toggle} = useModal();
    const [accessToken, setAccessToken] = useState()
    const dispatch = useDispatch()
    let _user = useSelector(userState)

    useEffect(()=>{
        let loop
        const user = JSON.parse(localStorage.getItem("user"))
        if(!_user.isLoggedIn){
            // REMEMBER LOGIN
            if(user && user.exp && user.exp > (Date.now()/1000).toFixed()){
                dispatch(userSlice.actions.loggedIn(user))

            }
        }else{
            if(isShowing) toggle()
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
    },[_user.isLoggedIn])
    const categories = useSelector(allCategoriesState)
    const isSuccess = useSelector(categorySuccessState)
    useEffect(()=>{
        axios.defaults.headers.post['Authorization'] = "Bearer " + accessToken
        axios.defaults.headers.put['Authorization'] = "Bearer " + accessToken
        axios.defaults.headers.delete['Authorization'] = "Bearer " + accessToken
    },[accessToken])

    useEffect(()=>{
        dispatch(categorySlice.actions.getCategoriesRequest({all:true}))
    },[dispatch])

    useEffect(()=>{
        if(isSuccess.getCategories==1){
        dispatch(categorySlice.actions.storeLocalToAll())
        }
    },[isSuccess.getCategories])

    return(
        <header>
            <nav className={clsx(styles.navbar)}>
                <div className={clsx(styles.left_navbar)}>Logo</div>
                <div className={clsx(styles.main_navbar)}>
                    <Link className={["link_padding","link"]} to="/">Trang chủ</Link>
                    <HoverScrollBtn btnContent={"Thể Loại"} btnClassName={["link_padding","link"]}>
                        {categories && categories.map(category=>{
                            return <div className="p-10"><Link to={`/category/${category._id}?name=${category.name}`}>{category.name}</Link></div>
                        })}
                    </HoverScrollBtn>
                    <SearchForm/>
                </div>
                {
                    !_user.isLoggedIn?
                    <div className={clsx(styles.right_navbar)}>
                        <Button onClick={toggle}>Login</Button>
                    </div>:
                    _user&&
                    <ProfileCard data={_user.data}/>
                }
                
            </nav>
            <Modal isShowing={isShowing} hide={toggle}>
                <LoginForm/>
            </Modal>
        </header>

    )
}
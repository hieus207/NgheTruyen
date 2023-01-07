import clsx from "clsx";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./pageHeader.module.scss"
import {ImSearch} from "react-icons/im"
import { BiLogIn } from "react-icons/bi"
import {IoChevronBackOutline} from "react-icons/io5"
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import ProfileCard from "./ProfileCard";
import useModal from "../../hooks/useModal";
import LoginForm from "./LoginForm";
import Modal from "../helpers/Modal";

export default function PageHeader(){
    const [querry, setQuerry] = useState("")
    const navigate = useNavigate()
    const [userData, isLoggedIn] = useAuth()
    const {isShowing, toggle} = useModal()

    const handleSearch = ()=>{
        navigate("/search"+(querry===""?"":"?name="+querry))
    }
    const handleKeyDown  = (e)=>{
        if (e.key === 'Enter') {
            navigate("/search"+(querry===""?"":"?name="+querry))
        }
    }

    const handleGoBack = ()=>{
        navigate(-1)
    }

    useEffect(()=>{
        if(isLoggedIn&&isShowing){
            toggle()
        }
    },[isLoggedIn, isShowing, toggle])

    return(
        <>
        <div>
            <div className={clsx(styles.backBtn)}>
                <IoChevronBackOutline onClick={handleGoBack}/>
            </div>
            <span className={clsx(styles.wrapper)}>
                <input value={querry} onChange={e=>setQuerry(e.target.value)} className={clsx(styles.searchInput)} onKeyDown={handleKeyDown}/>
                <ImSearch className={clsx(styles.searchBtn)} onClick={handleSearch}/>
            </span>
            <div className={clsx(styles.loginBtn)}>
                {!isLoggedIn? <BiLogIn onClick={toggle}/>: <ProfileCard data={userData}/>}
            </div>
            <Modal isShowing={isShowing} hide={toggle}>
                <LoginForm/>
            </Modal>
        </div>
        <Outlet/>
        </>

        
    )

}
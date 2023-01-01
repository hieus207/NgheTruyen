import clsx from "clsx"
import { useRef } from "react"
import styles from "./profileCard.module.scss"
import Image from "../Image"
import { logout } from "../../../api"
import { useDispatch } from "react-redux"
import { userSlice } from "../../../redux/reducers/userSlice"
import Link from "../Link"
// import React from 'react'
const ProfileCard = ({ data }) => {
    
    const dispatch = useDispatch()

    const handleLogout = () => {
        logout({token: data.refreshToken})
        localStorage.removeItem("user")
        dispatch(userSlice.actions.loggedOut())
    }

    return(
    <div className="d-flex f-column">
        <Image src={data.avatar} alt="avatar" thumbAvatar className={clsx(styles.avatar)}/>
        <div className={clsx(styles.subMenu)}>
            <Link to="/dashboard">Bảng điều khiển</Link>
            <hr/>
            <div className="link" onClick={handleLogout}>Đăng xuất</div>
        </div>
    </div>
       
    )
}

export default ProfileCard
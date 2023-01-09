import clsx from "clsx"
import styles from "./profileCard.module.scss"
import Image from "../../helpers/Image"
import { logout } from "../../../api"
import { useDispatch } from "react-redux"
import Link from "../../helpers/Link"
import axios from "axios"
import { userSlice } from "../../../redux/reducers/userSlice"
import { DASHBOARD, LOGOUT } from "../../../constants"

const ProfileCard = ({ data }) => {
    
    const dispatch = useDispatch()

    const handleLogout = () => {
        logout({token: data.refreshToken})
        localStorage.removeItem("user")
        dispatch(userSlice.actions.loggedOut())
        axios.defaults.headers.post['Authorization'] = ""
        axios.defaults.headers.put['Authorization'] = ""
        axios.defaults.headers.delete['Authorization'] = ""
    }

    return(
    <div className="d-flex f-column">
        <Image src={data.avatar} alt="avatar" thumbAvatar className={clsx(styles.avatar)}/>
        <div className={clsx(styles.subMenu)}>
            <Link to="/dashboard">{DASHBOARD}</Link>
            <hr/>
            <div className="link" onClick={handleLogout}>{LOGOUT}</div>
        </div>
    </div>
       
    )
}

export default ProfileCard
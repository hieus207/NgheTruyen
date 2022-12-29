import clsx from 'clsx'
import { Outlet } from 'react-router-dom'
import Link from '../../helpers/Link'
import styles from "./dashboard.module.scss"

export default function DashboardHeader(){

    return(
        <div className={clsx("")}>
            <Link to={'/dashboard'}> Truyện </Link>
            <Link to={'/dashboard/teller'}> Giọng Đọc </Link>
            <Link to={'/dashboard/author'}> Tác Giả </Link>
            <Link to={'/dashboard/category'}> Thể Loại </Link>
            <Outlet/>
        </div>
    )
}
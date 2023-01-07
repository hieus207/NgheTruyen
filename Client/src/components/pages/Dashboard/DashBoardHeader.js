import clsx from 'clsx'
import { Outlet, useLocation } from 'react-router-dom'
import { AUTHOR, CATEGORY, STORY, TELLER } from '../../../constants';
import Link from '../../helpers/Link'
import styles from "./dashboard.module.scss"

export default function DashboardHeader(){

    const location = useLocation();

    return(
        <div className={clsx(styles.navWrapper)}>
            <div className={clsx('d-flex f-row',styles.navbar)}>
                <Link to={'/dashboard'} className={[clsx(styles.navbarItem,{[styles.navbarActiveItem]:location.pathname==='/dashboard'||location.pathname.includes("/dashboard/story")})]}><div className={clsx('link_padding link')}>{STORY}</div> </Link>
                <Link to={'/dashboard/teller'} className={[clsx(styles.navbarItem,{[styles.navbarActiveItem]:location.pathname==='/dashboard/teller'})]}><div className={clsx('link_padding link')}>{TELLER}</div></Link>
                <Link to={'/dashboard/author'} className={[clsx(styles.navbarItem,{[styles.navbarActiveItem]:location.pathname==='/dashboard/author'})]}><div className={clsx('link_padding link')}>{AUTHOR}</div></Link>
                <Link to={'/dashboard/category'} className={[clsx(styles.navbarItem,{[styles.navbarActiveItem]:location.pathname==='/dashboard/category'})]}><div className={clsx('link_padding link')}>{CATEGORY}</div></Link>
            </div>
            <Outlet/>
        </div>
    )
}
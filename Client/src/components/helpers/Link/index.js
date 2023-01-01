import {Link as Links} from "react-router-dom"
import clsx from "clsx"
import styles from "./link.module.scss"
export default function Link({to,children, btn = false,className=[]}){
    return(
        <Links className={clsx(styles.router_link,...className,{[styles.btn]:btn})} to={to}>{children}</Links>
    )
}

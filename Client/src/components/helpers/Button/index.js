import clsx from "clsx"
import styles from "./button.module.scss"
export default function Button({onClick,children}){
    return(
        <button className={clsx(styles.button_default)} onClick={onClick}>{children}</button>
    )
}
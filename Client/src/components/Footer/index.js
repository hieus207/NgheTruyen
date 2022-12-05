import clsx from "clsx"
import styles from "./footer.module.scss"
export default function Footer(){
    return(
        <footer className={clsx(styles.navbar)}>
            <div className={clsx(styles.container)}>
                <h3>Footer</h3>
            </div>
        </footer>
    )
}
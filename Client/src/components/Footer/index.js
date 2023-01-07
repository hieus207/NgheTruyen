import clsx from "clsx"
import styles from "./footer.module.scss"
export default function Footer(){
    return(
        <footer className={clsx(styles.navbar)}>
            <div className={clsx(styles.container)}>
            © Copyright 2022 by <a href="http://github.com/hieus207" target={"_blank"}>hieus207</a>. All Rights Reserved.
            </div>
        </footer>
    )
}
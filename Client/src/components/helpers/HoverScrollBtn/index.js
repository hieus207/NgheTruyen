import clsx from "clsx"
import styles from "./hoverScroll.module.scss"
import Link from "../Link"
// import React from 'react'
const HoverScrollBtn = ({ btn = false, btnContent , btnClassName = [],children }) => {

    return(
    <div className="d-flex f-column">
        {btn?
        <button className={clsx(styles.btn,...btnClassName)}>{btnContent}</button>
        :
        <div className={clsx(styles.btn,...btnClassName)}>{btnContent}</div>}

        <div className={clsx(styles.subMenu)}>
            {children}
        </div>
    </div>
       
    )
}

export default HoverScrollBtn
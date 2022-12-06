import clsx from "clsx"
import { useRef } from "react"
import styles from "./progressBar.module.scss"
// import React from 'react'
const ProgressBar = ({ currentVal = 0, onClickBar = null }) => {
    const barRef = useRef()
    const handleClickBar = (e) => {
        const coor = barRef.current.getBoundingClientRect()  
        onClickBar(coor.width==0?0:(e.clientX-coor.x)*100/coor.width)
    }

    return(
       <div className={clsx(styles.bar)} onClick={onClickBar?handleClickBar:null} ref={barRef}>
            <div className={clsx(styles.currentProgress)} style={{width: currentVal+"%"}}></div>
       </div>
    )
}

export default ProgressBar
import clsx from "clsx"
import {  useEffect, useRef, useState } from "react"
import styles from "./progressBar.module.scss"
const ProgressBar = ({ currentVal = 0, onClickBar = null }) => {
    const barRef = useRef()
    const [isSlide, setSlide] = useState(false)
    
    const handleClickBar = (e) => {
        const coor = barRef.current.getBoundingClientRect()
        onClickBar(coor.width===0?0:(e.clientX-coor.x)*100/coor.width)
    }

    const handleMouseDown = ()=>{
        setSlide(true)
    }

    const handleMouseUp = () => {
        setSlide(false)
    }

    const handleMouseMove =(e) =>{
            const coor = barRef.current.getBoundingClientRect()
            const result = (e.clientX-coor.x)*100/coor.width
            onClickBar(result<0?0:result>100?100:result);
    }

    useEffect(()=>{
        if(barRef){   
            if(isSlide){
                window.addEventListener('mousemove',handleMouseMove)
                window.addEventListener('mouseup',handleMouseUp)
            }
        }
        return ()=>{
            if(barRef){
                window.removeEventListener('mousemove',handleMouseMove)
                window.removeEventListener('mouseup',handleMouseUp)

            }
        }
    },[isSlide])

    return(
       <div className={clsx(styles.bar)} onClick={onClickBar?handleClickBar:null} ref={barRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            <div className={clsx(styles.currentProgress)} style={{width: currentVal+"%"}}></div>
       </div>
    )
}

export default ProgressBar
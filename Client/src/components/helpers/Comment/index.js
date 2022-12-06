
import clsx from "clsx"
import { useState } from "react"
import CommentForm from "../CommentForm"
import styles from "./comment.module.scss"
export default function Comment({data}){
    const [isReply,setIsReply] = useState(false)
    const handleReply = () => {
        setIsReply(!isReply)
    }
    return(
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.body)}>
                <div className={clsx(styles.leftComment)}>
                    <img className={clsx(styles.avt)} src={data.avatar}/>
                </div>
                
                <div className={clsx(styles.rightComment)}>
                    <div className={clsx(styles.name)}>
                        {data.name} - @{data.username}
                    </div>
                    <div className={clsx(styles.date)}>
                        {data.createdAt}
                    </div>
                    <div  className={clsx(styles.content)}>
                        {data.content}
                    </div>
                </div>
            </div>
            <div className={clsx("clearfix")}>
                <button className={clsx("left")} onClick={handleReply}>Reply</button>
            </div>
            {
                isReply &&
                <div className={clsx(styles.subWrapper)}>
                    <CommentForm/>
                </div>
            }
            
            {data.subComments.map((scmt,index) => {
                return(
                    <div key={"scmt"+index} className={clsx(styles.subWrapper)}>
                        <div className={clsx(styles.leftComment)}>
                            <img className={clsx(styles.avt)} src={scmt.avatar}/>
                        </div>
                        
                        <div className={clsx(styles.rightComment)}>
                            <div className={clsx(styles.name)}>
                                {scmt.name} - @{scmt.username}
                            </div>
                            <div className={clsx(styles.date)}>
                                {scmt.createdAt}
                            </div>
                            <div  className={clsx(styles.content)}>
                                {scmt.content}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>

    )
}

import clsx from "clsx"
import StoryCard from "../StoryCard"
import styles from "./storyList.module.scss"

export default function StoryList({data,small=false}){
    return(
        <div className={clsx(styles.wrapper)}>
            {data.map(elm=>(
                    <StoryCard key={elm.id} data={elm} small={small}/>
            ))}
        </div>
    )
}

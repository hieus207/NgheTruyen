import clsx from 'clsx'
import ChapterItem from './ChapterItem'
import styles from "./story.module.scss"
export default function ListChapter({data, OnPlay, OnPause, idStory}){  

    return(
    <div className={clsx(styles.listWrapper)}>
        {data.map((url,index) => <ChapterItem key={`${url} ${index}`} data={{index,url}} OnPlay={OnPlay} OnPause={OnPause} idStory={idStory}/>)}
    </div>
    
    )
}
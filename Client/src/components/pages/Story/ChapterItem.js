import clsx from 'clsx'
import styles from "./story.module.scss"
import {IoPlay, IoPause } from "react-icons/io5"
import { useSelector } from 'react-redux'
import { audioState } from '../../../redux/selectors'
import { CHAPTER } from '../../../constants'


export default function ChapterItem({data, OnPlay, OnPause, idStory}){ 
    const audio = useSelector(audioState)
    const active = (audio.id === idStory)&&(audio.chapterId === data.index)
    const playing = (audio.id === idStory)&&(audio.chapterId === data.index)&&audio.playing

    
    return (
        <div className={clsx(styles.chapterWrap,{
            [styles.chapterActive] : active
        })}>
            <div className={clsx(styles.chapterName)}>{CHAPTER} {data.index+1}</div>
            <div className={clsx(styles.playButton,{
                [styles.playButtonActive]: active
            })}
            onClick={playing?()=>OnPause():()=>OnPlay(data.index)}
            >
                {playing?<IoPause/>:<IoPlay/>}
                
            </div>
        </div>
    )
}
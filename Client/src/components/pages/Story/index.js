import clsx from 'clsx'
import { useState } from 'react'
import MultiPlayer from '../../helpers/MultiAudio'
import styles from "./story.module.scss"
import { storyAudioSlice } from './storyAudioSlice'
import {useDispatch} from "react-redux"

export default function Story(){
    const [url,setUrl] = useState('')
    const fakeStory= {
        id: 1,
        name: "Thế Giới Tiên Hiệp",
        chap: 56,
        img: "https://radiotruyen.info/upload/cover/thumbnail_wm/the-gioi-tien-hiep-pt--400.jpg?v=4",
        author: "Vô Tội",
        authorId: 1,
        teller: "Phan Thuyên",
        tellerId: 1,
        category: "Tiên hiệp",
        view: 1500
    }
    const dispatch = useDispatch()
    const handlePlayAudio = ()=>{
        dispatch(storyAudioSlice.actions.urlAudioChange(url))
    }

    return(
        <div className={clsx("container")}>
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.left_content)}>
                    <img src={fakeStory.img} alt={"img for " + fakeStory.name}/>
                    <div>{fakeStory.name}</div>
                    <div>Tác giả: {fakeStory.author}</div>
                    <div>Giọng đọc: {fakeStory.teller}</div>
                    <div>Thể loại: {fakeStory.category}</div>
                </div>
                <div className={clsx(styles.right_content)}>
                <MultiPlayer
                    urls={[
                    'https://audio-previews.elements.envatousercontent.com/files/148785970/preview.mp3?response-content-disposition=attachment%3B+filename%3D%22RZFWLXE-bell-hop-bell.mp3%22',
                    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
                    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
                    ]}
                />
                <input value={url} onChange={(e)=>setUrl(e.target.value)}/>
                <button onClick={handlePlayAudio}>Play</button>
                </div>
            </div>
        </div>
    )
}
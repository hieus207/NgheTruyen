import clsx from 'clsx'
import styles from "../dashboard.module.scss"
import Image from "../../../helpers/Image"
import AudioPlayer from '../../../helpers/AudioPlayer'
import useModal from "../../../../hooks/useModal"
import Modal from "../../../helpers/Modal"
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { storySlice } from '../../../../redux/reducers/storySlice'
import { storiesState } from '../../../../redux/selectors'
export default function DetailStory(){
    const {isShowing, toggle} = useModal();
    const { storyId } = useParams();

    console.log(storyId)
    const dispatch = useDispatch()

    const story = useSelector(storiesState)
    useEffect(()=>{
        dispatch(storySlice.actions.getStoryRequest(storyId))
        
    },[dispatch])
    console.log(story.chapter)
    const [contentModel,setContentModel] = useState(<></>) 

    const handleUpdate = ()=>{
        setContentModel(<>Update</>)
        toggle()
    }

    const handleDelete = ()=>{
        setContentModel(<>Delete</>)
        toggle()
    }

    const handleAddChapter = () => {
        setContentModel(<>Add chapter</>)
        toggle()
    }

    return(
        <>
        {
        story&&
            <div className={clsx("container ",styles.dtWrapper)}>
                <Image src={story.img} alt={'img for ' + story.name} normal/>
                <div className={clsx(styles.rightContent)}>
                    <div><h3>{story.name}</h3></div>
                    <div>Tác giả: {story.author}</div>
                    <div>Giọng đọc: {story.teller}</div>
                    {story.chapter&&
                    
                    <AudioPlayer urls={story.chapter} manager onUpdate={handleUpdate} onDelete={handleDelete}/>
                    }
                    
                    
                    
                    <Modal isShowing={isShowing} hide={toggle}>{contentModel}</Modal>
                    <button onClick={handleAddChapter}>Thêm tập</button>
                </div>
            </div>
        }
        </>
        
    )
}
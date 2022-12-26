import clsx from 'clsx'
import styles from "../dashboard.module.scss"
import Image from "../../../helpers/Image"
import AudioPlayer from '../../../helpers/AudioPlayer'
import ConfirmDelete from '../../../helpers/ConfirmDelete'
import EditChapterForm from '../../../helpers/EditChapterForm'
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
    const [isShowing2, setIsShowing2] = useState(false)
    const [chapterIndex, setChapterIndex] = useState(-1)


    function toggle2(){
        setIsShowing2(!isShowing2)
    }
 
    const dispatch = useDispatch()

    const story = useSelector(storiesState)
    useEffect(()=>{
        dispatch(storySlice.actions.getStoryRequest(storyId))
        
    },[dispatch])
    console.log(story.chapter)
    const [contentModel,setContentModel] = useState(<></>) 

    const onDeleteChapter = ()=>{
        console.log("BODY")
        console.log({id:storyId, chapterIndex:chapterIndex});
        dispatch(storySlice.actions.deleteChapterRequest({id:storyId, chapterIndex:chapterIndex}))
    }

    const handleUpdate = (index)=>{
        console.log("```````````````")
        console.log(index)
        setContentModel(<EditChapterForm isEdit _data={story} _chapterIndex={index}/>)
        toggle()
    }

    const handleDelete = (index)=>{
        toggle2()     
        setChapterIndex(index)   
    }

    const handleAddChapter = () => {
        setContentModel(<EditChapterForm _data={story}/>)
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
                    <Modal isShowing={isShowing2} hide={toggle2}>
                        <ConfirmDelete onCancel={toggle2} onConfirm={onDeleteChapter}/>
                    </Modal>
                    <button onClick={handleAddChapter}>Thêm tập</button>
                </div>
            </div>
        }
        </>
        
    )
}
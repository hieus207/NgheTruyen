import clsx from 'clsx'
import styles from "../dashboard.module.scss"
import Image from "../../../helpers/Image"
import AudioPlayer from '../../../helpers/AudioPlayer'
import ConfirmDelete from '../../../helpers/ConfirmDelete'
import EditChapterForm from './EditChapterForm'
import useModal from "../../../../hooks/useModal"
import Modal from "../../../helpers/Modal"
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { storySlice } from '../../../../redux/reducers/storySlice'
import { storiesState, storiesSuccessState } from '../../../../redux/selectors'
import { AUTHOR, CHAPTER, CREATE_BTN, TELLER } from '../../../../constants'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
export default function DetailStory(){
    const {isShowing, toggle} = useModal();
    const { storyId } = useParams();
    const [isShowing2, setIsShowing2] = useState(false)
    const [chapterIndex, setChapterIndex] = useState(-1)
    const [refresh,setRefresh] = useState(false)
    const [contentModel,setContentModel] = useState(<></>) 
    const dispatch = useDispatch()

    const story = useSelector(storiesState)
    const isSuccesss = useSelector(storiesSuccessState)

    const RefreshData = useCallback(()=>{
        setRefresh(!refresh)
    },[refresh])

    function toggle2(){
        setIsShowing2(!isShowing2)
    }

    useEffect(()=>{
        dispatch(storySlice.actions.getStoryRequest(storyId))
    },[dispatch, refresh, storyId])

    useEffect(()=>{
        if(isSuccesss.deleteChapter ===1 ||isSuccesss.addChapter ===1 ||isSuccesss.editChapter === 1){
            RefreshData()
            dispatch(storySlice.actions.resetIsSuccess())
            if(isSuccesss.deleteChapter===0)
                toggle()
        }
    },[dispatch, RefreshData, toggle, isSuccesss.deleteChapter, isSuccesss.addChapter, isSuccesss.editChapter])


    const onDeleteChapter = ()=>{
        dispatch(storySlice.actions.deleteChapterRequest({id:storyId, chapterIndex: chapterIndex}))
        toggle2()
    }

    const handleUpdate = (index)=>{
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
        <div hidden={story&&story.name}>
            <AiOutlineLoading3Quarters className='rotate loading'/>
        </div>
        {
        story&&
            <div className={clsx(" ",styles.dtWrapper)}>
                {story.name &&
                <>
                <div className="d-flex a-center">
                <Image src={story.img} alt={'img for ' + story.name} normal className={["round"]}/>
                </div>
                
                <div className={clsx(styles.rightContent)}>
                    <div><h3>{story.name}</h3></div>
                    <div>{AUTHOR}: {story.author}</div>
                    <div>{TELLER}: {story.teller}</div>
                    <div>&nbsp;</div>
                    {isSuccesss.getStory===1 && story.chapter&&
                    <AudioPlayer urls={story.chapter} manager onUpdate={handleUpdate} onDelete={handleDelete}/>
                    }
                                        
                    <Modal isShowing={isShowing} hide={toggle}>{contentModel}</Modal>
                    <Modal isShowing={isShowing2} hide={toggle2}>
                        <ConfirmDelete onCancel={toggle2} onConfirm={onDeleteChapter}/>
                    </Modal>
                    <button onClick={handleAddChapter}>{`${CREATE_BTN} ${CHAPTER}`}</button>
                </div>
                </>
                }
            </div>
        }
        </>
        
    )
}
import clsx from 'clsx'
import styles from "../dashboard.module.scss"
import StoryItem from './StoryItem'
import Link from '../../../helpers/Link'
import { useDispatch, useSelector } from 'react-redux'
import { storySlice } from '../../../../redux/reducers/storySlice'
import { useCallback, useEffect, useState } from 'react'
import { storiesState, storiesSuccessState } from '../../../../redux/selectors'
import PaginationBar from '../../../helpers/PaginationBar'
import { useSearchParams } from 'react-router-dom'
import { CREATE_BTN, STORY } from '../../../../constants'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
export default function ManageStory(){

    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const stories = useSelector(storiesState)
    const _stories = stories.data
    const [refresh,setRefresh] = useState(false)
    const isSuccess = useSelector(storiesSuccessState)

    const RefreshData = useCallback(()=>{
        setRefresh(!refresh)
    },[refresh])

    useEffect(()=>{
        if(isSuccess.deleteStory===1){
            dispatch(storySlice.actions.resetIsSuccess())
            RefreshData()
        }
    },[dispatch, RefreshData, isSuccess.deleteStory])

    useEffect(()=>{
        if(searchParams.get("page")){
            setPage(searchParams.get("page"))
        }
    },[searchParams])

    useEffect(()=>{
        dispatch(storySlice.actions.getStoriesRequest({ page }))
    },[dispatch, page, refresh])

    return(
        <div className={clsx(styles.wrapper)}>
            <div className='m-10'>
                <Link to={'/dashboard/story/create'} btn>{`${CREATE_BTN} ${STORY}`}</Link>
            </div>
            <div className={clsx(styles.listWrapper)}>
                <div hidden={isSuccess.getStories>0}>
                    <AiOutlineLoading3Quarters className='rotate loading-relative'/>
                </div>
                <div className={clsx(styles.listStory)}>
                    {_stories && _stories.length>0 && _stories.map(story => <StoryItem key={story._id} data={story} dispatch={dispatch}/>)}
                </div>
                
            </div>
            {stories.lastestPage>0 && <PaginationBar currentPage={page} lastestPage = {stories.lastestPage}/>}
        </div>
    )
}
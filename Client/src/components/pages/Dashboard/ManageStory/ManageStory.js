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
export default function ManageStory(){

    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const stories = useSelector(storiesState)
    const _stories = stories.data
    const [refresh,setRefresh] = useState(false)
    const isSuccess = useSelector(storiesSuccessState)
    const RefreshData = ()=>{
        setRefresh(!refresh)
    }

    useEffect(()=>{
        if(isSuccess.deleteStory==1){
            dispatch(storySlice.actions.resetIsSuccess())
            RefreshData()
        }
        // if ==2 return error
    },[isSuccess.deleteStory])

    useEffect(()=>{
        if(searchParams.get("page")){
            setPage(searchParams.get("page"))
        }
    },[searchParams.get("page")])

    useEffect(()=>{
        dispatch(storySlice.actions.getStoriesRequest({ page }))
    },[dispatch, page, refresh])
    return(
        <div className={clsx(styles.wrapper)}>
            <div className='m-10'>
                <Link to={'/dashboard/story/create'} btn> Thêm truyện</Link>
            </div>
            <div className={clsx(styles.listWrapper)}>
                <div className={clsx(styles.listStory)}>
                    {_stories && _stories.length>0 && _stories.map(story => <StoryItem data={story} dispatch={dispatch}/>)}
                </div>
                
            </div>
            {stories.lastestPage && <PaginationBar currentPage={page} lastestPage = {stories.lastestPage}/>}
        </div>
    )
}
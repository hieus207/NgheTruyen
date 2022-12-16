import clsx from 'clsx'
import styles from "../dashboard.module.scss"
import StoryItem from './StoryItem'
import Link from '../../../helpers/Link'
import { useDispatch, useSelector } from 'react-redux'
import { storySlice } from '../../../../redux/reducers/storySlice'
import { useEffect, useState } from 'react'
import { storiesState } from '../../../../redux/selectors'
import PaginationBar from '../../../helpers/PaginationBar'
import { useSearchParams } from 'react-router-dom'
export default function ManageStory(){

    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const stories = useSelector(storiesState)
    const _stories = stories.data
    
    
    useEffect(()=>{
        if(searchParams.get("page")){
            setPage(searchParams.get("page"))
        }
    },[searchParams.get("page")])

    useEffect(()=>{
        dispatch(storySlice.actions.getStoriesRequest({ page }))
    },[dispatch,page])
    return(
        <div className={clsx("container",styles.wrapper)}>
            Manage
            <Link to={'/dashboard/story/create'}> Thêm truyện</Link>
            <div className={clsx(styles.listWrapper)}>
                <div className={clsx(styles.listStory)}>
                    {_stories && _stories.length>0 && _stories.map(story => <StoryItem data={story} dispatch={dispatch}/>)}
                </div>
                
            </div>
            {stories.lastestPage && <PaginationBar currentPage={page} lastestPage = {stories.lastestPage}/>}
        </div>
    )
}
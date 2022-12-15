import clsx from 'clsx'
import styles from "../dashboard.module.scss"
import fakeStories from "../../../../mocks/story.json"
import StoryItem from './StoryItem'
import Link from '../../../helpers/Link'
import { useDispatch, useSelector } from 'react-redux'
import { storySlice } from '../../../../redux/reducers/storySlice'
import { useEffect } from 'react'
import { storiesState } from '../../../../redux/selectors'
export default function ManageStory(){

    const dispatch = useDispatch()
    const stories = useSelector(storiesState)

    useEffect(()=>{
        dispatch(storySlice.actions.getStoriesRequest())

    },[dispatch])

    return(
        <div className={clsx("container",styles.wrapper)}>
            Manage
            <Link to={'/dashboard/story/create'}> Thêm truyện</Link>
            <div className={clsx(styles.listWrapper)}>
                <div className={clsx(styles.listStory)}>
                    {stories.length>0&&stories.map(story => <StoryItem data={story} dispatch={dispatch}/>)}
                </div>
            </div>

        </div>
    )
}
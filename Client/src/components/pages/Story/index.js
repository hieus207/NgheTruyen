import clsx from 'clsx'
import { useEffect, useState } from 'react'
import AudioPlayer from '../../helpers/AudioPlayer'
import styles from "./story.module.scss"
import { storyAudioSlice } from './storyAudioSlice'
import {useDispatch, useSelector} from "react-redux"
import Comment from '../../helpers/Comment'
import CommentForm from '../../helpers/CommentForm'
import { storySlice } from '../../../redux/reducers/storySlice'
import { commentsState, storiesState } from '../../../redux/selectors'
import { useParams } from 'react-router-dom'
import { commentSlice } from '../../../redux/reducers/commentSlice'

export default function Story(){  
    
    const dispatch = useDispatch()
    
    const { storyId } = useParams();

    const story = useSelector(storiesState)
    const comments = useSelector(commentsState)

    useEffect(()=>{
        dispatch(storySlice.actions.getStoryRequest(storyId))
        dispatch(commentSlice.actions.getCommentsStoryRequest(storyId))
        
    },[dispatch,storyId])

    return(
        <div className={clsx("container",styles.wrapper)}>
            <div className={clsx(styles.body)}>
                <div className={clsx(styles.left_content)}>
                    <img src={story.img} alt={"img for " + story.name}/>
                    <div>{story.name}</div>
                    <div>Tác giả: {story.author}</div>
                    <div>Giọng đọc: {story.teller}</div>
                    <div>Thể loại: {story.category}</div>
                </div>
                <div className={clsx(styles.right_content)}>
                    {story.chapter&&
                    <AudioPlayer
                        urls={story.chapter}
                    />
                    }
                    <div>{story.description}</div>
                </div>
            </div>
            <div className={clsx(styles.commentsSection)}>
                Comments
                <CommentForm id={storyId}/>
                {comments.length > 0 && comments.map(comment=>{
                    return (
                        <Comment key={comment.username} data={comment} />
                    )
                })}
            </div>
        </div>
    )
}
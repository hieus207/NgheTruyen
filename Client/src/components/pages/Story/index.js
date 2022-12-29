import clsx from 'clsx'
import { useEffect, useState } from 'react'
import AudioPlayer from '../../helpers/AudioPlayer'
import styles from "./story.module.scss"
import { storyAudioSlice } from './storyAudioSlice'
import {useDispatch, useSelector} from "react-redux"
import Comment from '../../helpers/Comment'
import CommentForm from '../../helpers/CommentForm'
import { storySlice } from '../../../redux/reducers/storySlice'
import { commentsState, commentSuccessState, storiesState } from '../../../redux/selectors'
import { useParams } from 'react-router-dom'
import { commentSlice } from '../../../redux/reducers/commentSlice'
import Link from '../../helpers/Link'

export default function Story(){  
    
    const dispatch = useDispatch()
    
    const { storyId } = useParams();

    const story = useSelector(storiesState)
    const comments = useSelector(commentsState)
    const [refresh,setRefresh] = useState(false)
    const isSuccess = useSelector(commentSuccessState)
    const RefreshData = ()=>{
        setRefresh(!refresh)
    }

    useEffect(()=>{
        dispatch(storySlice.actions.getStoryRequest(storyId))        
    },[dispatch,storyId])

    useEffect(()=>{
        dispatch(commentSlice.actions.getCommentsStoryRequest(storyId))
    },[dispatch, refresh])

    useEffect(()=>{
        if(isSuccess.createComment==1||isSuccess.createSubComment==1){
            dispatch(commentSlice.actions.resetIsSuccess())
            RefreshData()
        }
        // if ==2 return error
    },[isSuccess.createComment, isSuccess.createSubComment])


    return(
        <div className={clsx("container",styles.wrapper)}>
            <div className={clsx(styles.body)}>
                <div className={clsx(styles.left_content)}>
                    <img src={story.img} alt={"img for " + story.name}/>
                    <div>{story.name}</div>
                    <div>Tác giả: <Link to={"/author/"+story.authorId}>{story.author}</Link></div>
                    <div>Giọng đọc: <Link to={"/teller/"+story.tellerId}>{story.teller}</Link></div>
                    
                    <div>Thể loại: <Link to={"/category/"+story.categoryId}>{story.category}</Link></div>
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
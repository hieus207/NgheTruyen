import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import styles from "./story.module.scss"
import { useDispatch, useSelector } from "react-redux"
import Comment from './Comment'
import CommentForm from './CommentForm'
import { storySlice } from '../../../redux/reducers/storySlice'
import {  commentsState, commentSuccessState, storiesState, storiesSuccessState } from '../../../redux/selectors'
import { useParams } from 'react-router-dom'
import { commentSlice } from '../../../redux/reducers/commentSlice'
import Link from '../../helpers/Link'
import { AUTHOR, CATEGORY, COMMENT, TELLER } from '../../../constants'
import ListChapter from './ListChapter'
import { audioSlice } from '../../../redux/reducers/audioSlice'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function Story() {

    const dispatch = useDispatch()
    const { storyId } = useParams();
    const story = useSelector(storiesState)
    const comments = useSelector(commentsState)
    const [refresh, setRefresh] = useState(false)
    const isSuccess = useSelector(commentSuccessState)
    const storySuccess = useSelector(storiesSuccessState)
    const RefreshData = useCallback(() => {
        setRefresh(!refresh)
    },[refresh])

    const handlePlay = (chapterId) => {
        dispatch(audioSlice.actions.play({ id: storyId, chapter: story.chapter, chapterId }))
    }

    const handlePause = () => {
        dispatch(audioSlice.actions.pause())
    }

    useEffect(() => {
        dispatch(storySlice.actions.getStoryRequest(storyId))
        return () => {
            dispatch(storySlice.actions.resetState())
        }
    }, [dispatch, storyId])

    useEffect(() => {
        dispatch(commentSlice.actions.getCommentsStoryRequest(storyId))
    }, [dispatch, refresh, storyId])

    useEffect(() => {
        if (isSuccess.createComment === 1 || isSuccess.createSubComment === 1) {
            dispatch(commentSlice.actions.resetIsSuccess())
            RefreshData()
        }
    }, [dispatch, RefreshData, isSuccess.createComment, isSuccess.createSubComment])

    return (
        <div className={clsx(styles.wrapper)}>
            <div hidden={storySuccess.getStory !== 0 && isSuccess.getCommentsStory !== 0}>
                <AiOutlineLoading3Quarters className='rotate loading' />
            </div>
            {storySuccess.getStory === 1 && isSuccess.getCommentsStory === 1 &&
                <>
                    <div className={clsx(styles.body)}>
                        <div className={clsx(styles.left_content)}>
                            <img className={clsx(styles.ChapterImg, "round")} src={story.img} alt={"img for " + story.name} />
                            <div>{AUTHOR}: <Link to={`/author/${story.authorId}?name=${story.author}`}>{story.author}</Link></div>
                            <div>{TELLER}: <Link to={`/teller/${story.tellerId}?name=${story.teller}`}>{story.teller}</Link></div>
                            <div>{CATEGORY}: <Link to={`/category/${story.categoryId}?name=${story.category}`}>{story.category}</Link></div>
                        </div>
                        <div className={clsx(styles.right_content)}>
                            <div className="title">{story.name}</div>

                            {story && story.chapter &&
                                <ListChapter data={story.chapter} OnPlay={handlePlay} OnPause={handlePause} idStory={story._id} />
                            }

                            <div className={clsx(styles.desc)}>{story.description}</div>
                        </div>
                    </div>
                    <div className={clsx(styles.commentsSection)}>
                        <div className='title'>{COMMENT}</div>
                        <CommentForm id={storyId} />
                        {comments.length > 0 && comments.map(comment => {
                            return (
                                <Comment key={comment.username} data={comment} />
                            )
                        })}
                    </div>
                </>
            }
        </div>
    )
}
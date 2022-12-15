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


    const fakeStory= {
        id: 1,
        name: "Thế Giới Tiên Hiệp",
        chap: 56,
        img: "https://radiotruyen.info/upload/cover/thumbnail_wm/the-gioi-tien-hiep-pt--400.jpg?v=4",
        author: "Vô Tội",
        authorId: 1,
        teller: "Phan Thuyên",
        tellerId: 1,
        category: "Tiên hiệp",
        view: 1500,
        description:`Thiên địa là quán trọ cho vạn vật chúng sinh, còn thời gian vốn là khách qua đường từ xưa đến nay.

        Sinh và tử sai biệt, sự khác biệt cũng tựa như giữa mộng và tỉnh, luôn biến hóa rối ren, không thể xét dò.
        
        Như vậy thì, nếu đã vượt qua sinh tử, đã vượt ra thiên địa, tại bên ngoài thời gian, chúng ta sẽ gặp phải điều gì nữa, và bản thân chúng ta đã là đẳng cấp gì, định nghĩa ra sao?
        
        Đây là quyển sách kế tiếp của Nhĩ Căn, sau những quyển: 《 Tiên Nghịch 》 《 Cầu Ma 》 《 Ngã Dục Phong Thiên 》 《 Nhất Niệm Vĩnh Hằng 》 《 Tam Thốn Nhân Gian 》, là quyển tiểu thuyết dài thứ 6 《 Quang Âm Chi Ngoại 》(Dịch tên truyện: Bên Ngoài Thời Gian).`
    }
    const fakeComments = [
        {
            name: "Hieu",
            username: "hieulaptop",
            avatar: "https://secure.gravatar.com/avatar/36a7abced5c929ba7572c5ad29a6eff7?s=128&d=mm&r=g",
            content: `Thiên địa là quán trọ cho vạn vật chúng sinh, còn thời gian vốn là khách qua đường từ xưa đến nay. Sinh và tử sai biệt, sự khác biệt cũng tựa như giữa mộng và tỉnh, luôn biến hóa rối ren, không thể xét dò. Như vậy thì, nếu đã vượt qua sinh tử, đã vượt ra thiên địa, tại bên ngoài thời gian, chúng ta sẽ gặp phải điều gì nữa, và bản thân chúng ta đã là đẳng cấp gì`,
            createdAt: "06/12/2022",
            subComments: [
                {
                    name: "Hieu beo",
                    username: "hieubeo2k",
                    avatar: "https://secure.gravatar.com/avatar/36a7abced5c929ba7572c5ad29a6eff7?s=128&d=mm&r=g",
                    content: "Đúng vậy",
                    createdAt: "06/12/2022"
                },
                {
                    name: "Hieu beo",
                    username: "hieubeo2k",
                    avatar: "https://secure.gravatar.com/avatar/36a7abced5c929ba7572c5ad29a6eff7?s=128&d=mm&r=g",
                    content: "Tôi đồng ý",
                    createdAt: "06/12/2022"
                }
            ]
        },
        {
            name: "Hieu beo",
            username: "hieubeo2k",
            avatar: "https://secure.gravatar.com/avatar/36a7abced5c929ba7572c5ad29a6eff7?s=128&d=mm&r=g",
            content: "Truyện rất hay...",
            createdAt: "06/12/2022",
            subComments: []
        },
        {
            name: "Huy ho",
            username: "huydeptrai2k",
            avatar: "https://secure.gravatar.com/avatar/36a7abced5c929ba7572c5ad29a6eff7?s=128&d=mm&r=g",
            content: "Truyện rất tuyệt vời",
            createdAt: "06/12/2022",
            subComments: []
        }
    ]
    
    
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
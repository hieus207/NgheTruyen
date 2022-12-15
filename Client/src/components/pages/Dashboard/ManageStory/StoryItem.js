import clsx from 'clsx'
import Image from '../../../helpers/Image'
import styles from "../dashboard.module.scss"
import Link from "../../../helpers/Link"
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { storySlice } from '../../../../redux/reducers/storySlice'
export default function StoryItem({data,dispatch}){

    const handleDelete = () => {
        dispatch(storySlice.actions.deleteStorySuccess(data._id))
    }
    return(
        <div className={clsx(styles.storyWrapper)}>
            <div className={clsx("d-flex m-10 flex-wrap")}>
                <Image src={data.img} alt={"Img for "+data.name} thumb/>
                <div className={clsx(styles.metadata,"m-left-20")}>
                    <div><Link to={`/dashboard/story/${data._id}`}>{data.name}</Link></div>
                    <div>{data.author}</div>
                    <div>{data.teller}</div>
                    <div>{data.chap}</div>
                    <Link to={`/dashboard/story/${data._id}/edit`}>Sửa</Link>
                    <button onClick={handleDelete}>Xoá</button>
                </div>
            </div>
        </div>

    )
}
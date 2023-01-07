import clsx from 'clsx'
import Image from '../../../helpers/Image'
import styles from "../dashboard.module.scss"
import Link from "../../../helpers/Link"
import { useState } from 'react'
import { storySlice } from '../../../../redux/reducers/storySlice'
import Modal from '../../../helpers/Modal'
import ConfirmDelete from '../../../helpers/ConfirmDelete'
import { DELETE_BTN, EDIT_BTN } from '../../../../constants'
export default function StoryItem({data,dispatch}){

    const [isShowing, setIsShowing] = useState(false)
    
    const handleDelete = () => {
        dispatch(storySlice.actions.deleteStoryRequest(data._id))       
        toggle()

    }

    const toggle = ()=>{
        setIsShowing(!isShowing)
    }
    
    return(
        <div className={clsx(styles.storyWrapper)}>
            <div className={clsx("d-flex m-10 flex-wrap")}>
                <Image src={data.img} alt={"Img for "+data.name} thumb className={["round"]}/>
                <div className={clsx(styles.metadata,"m-left-20")}>
                    <div><Link to={`/dashboard/story/${data._id}`}>{data.name}</Link></div>
                    <div>{data.author}</div>
                    <div>{data.teller}</div>
                    <div>{data.chap}</div>
                    <div>
                    <Link to={`/dashboard/story/${data._id}/edit`} btn>{EDIT_BTN}</Link>
                    &nbsp;
                    <button onClick={toggle} className={"delete_btn"}>{DELETE_BTN}</button>
                    </div>

                </div>
            </div>
            <Modal isShowing={isShowing} hide={toggle}>
                <ConfirmDelete onCancel={toggle} onConfirm={handleDelete}/>
            </Modal>
        </div>

    )
}
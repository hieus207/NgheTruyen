import clsx from 'clsx'
import Image from '../../../helpers/Image'
import styles from "../dashboard.module.scss"
import useModal from '../../../../hooks/useModal'
import Modal from '../../../helpers/Modal'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import EditAuthorForm from '../../../helpers/EditAuthorForm'
import { authorSlice } from '../../../../redux/reducers/authorSlice'
import ConfirmDelete from '../../../helpers/ConfirmDelete'

export default function AuthorItem({data}){
    const {isShowing, toggle} = useModal()
    const [isShowing2, setIsShowing2] = useState(false)
    const dispatch = useDispatch()

    function toggle2(){
        setIsShowing2(!isShowing2)
    }

    const handleDelete = ()=>{
        dispatch(authorSlice.actions.deleteAuthorRequest(data._id))
        toggle2()
    }
    return(
        <div className={clsx(styles.storyWrapper)}>
            <div className={clsx("d-flex m-10 flex-wrap")}>
                <Image src={data.img} alt={"Img for "+data.name} thumb/>
                <div className={clsx(styles.metadata,"m-left-20")}>
                    <div>{data.name}</div>
                    <div>{data.birthDay}</div>
                    <div>{data.username}</div>
                    <div>
                    <button onClick={toggle} className="edit_btn">Sửa</button>
                    &nbsp;
                    <button onClick={toggle2} className="delete_btn">Xoá</button>
                    </div>
                    
                </div>
            </div>
            <Modal isShowing={isShowing} hide={toggle}>
                <EditAuthorForm isEdit _data={data} onSubmit={toggle}/>
            </Modal>
            <Modal isShowing={isShowing2} hide={toggle2}>
                <ConfirmDelete onConfirm={handleDelete} onCancel={toggle2}/>
            </Modal>
        </div>

    )
}
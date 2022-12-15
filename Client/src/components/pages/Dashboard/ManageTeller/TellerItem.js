import clsx from 'clsx'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import useModal from '../../../../hooks/useModal'
import { tellerSlice } from '../../../../redux/reducers/tellerSlice'
import ConfirmDelete from '../../../helpers/ConfirmDelete'
import EditTellerForm from '../../../helpers/EditTellerForm'
import Image from '../../../helpers/Image'
import Modal from '../../../helpers/Modal'
import styles from "../dashboard.module.scss"

export default function TellerItem({data}){
    const {isShowing, toggle} = useModal()
    const [isShowing2, setIsShowing2] = useState(false)
    const dispatch = useDispatch()

    function toggle2(){
        setIsShowing2(!isShowing2)
    }

    const handleDelete = ()=>{
        dispatch(tellerSlice.actions.deleteTellerRequest(data._id))
    }
    
    return(
        <div className={clsx(styles.storyWrapper)}>
            <div className={clsx("d-flex m-10 flex-wrap")}>
                <Image src={data.img} alt={"Img for "+data.name} thumb/>
                <div className={clsx(styles.metadata,"m-left-20")}>
                    <div>{data.name}</div>
                    <div>{data.birthDay}</div>
                    <div>{data.username}</div>
                    <button onClick={toggle}>Sửa</button>

                    <button onClick={toggle2}>Xoá</button>
                </div>
            </div>
            <Modal isShowing={isShowing} hide={toggle}>
                <EditTellerForm isEdit _data={data}/>
            </Modal>
            <Modal isShowing={isShowing2} hide={toggle2}>
                <ConfirmDelete onConfirm={handleDelete} onCancel={toggle2}/>
            </Modal>
        </div>

    )
}
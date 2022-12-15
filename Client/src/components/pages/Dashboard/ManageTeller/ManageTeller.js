import clsx from 'clsx'
import { useEffect } from 'react'
import useModal from '../../../../hooks/useModal'
import { tellersState } from '../../../../redux/selectors'
import EditTellerForm from '../../../helpers/EditTellerForm'
import Modal from '../../../helpers/Modal'
import styles from "../dashboard.module.scss"
import TellerItem from "./TellerItem"
import { useDispatch, useSelector } from 'react-redux'
import { tellerSlice } from '../../../../redux/reducers/tellerSlice'
export default function ManageTeller(){
    const {isShowing,toggle} = useModal()

    const dispatch = useDispatch()
    const tellers = useSelector(tellersState)

    useEffect(()=>{
        dispatch(tellerSlice.actions.getTellersRequest())
        console.log(tellers)
    },[dispatch])

    return(
        <div className={clsx("container",styles.wrapper)}>
            Manage Teller
            <button onClick={toggle}>Create Teller</button>
            
            {/* <Link to={'/dashboard/teller/create'}> Thêm truyện</Link> */}
            <div className={clsx(styles.listWrapper)}>
                <div className={clsx(styles.listStory)}>
                    {tellers.map(teller => <TellerItem data={teller}/>)}
                </div>
            </div>

            <Modal isShowing={isShowing} hide={toggle}>
                <EditTellerForm/>
            </Modal>
        </div>
    )
}
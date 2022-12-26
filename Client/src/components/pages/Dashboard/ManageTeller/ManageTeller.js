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
import useParams from '../../../../hooks/useParams'
import PaginationBar from '../../../helpers/PaginationBar'
export default function ManageTeller(){
    const {isShowing,toggle} = useModal()
    const dispatch = useDispatch()
    const tellers = useSelector(tellersState)
    const params = useParams("page")

    useEffect(()=>{
        dispatch(tellerSlice.actions.getTellersRequest({page: params.page}))
    },[dispatch, params.page])

    return(
        <div className={clsx("container",styles.wrapper)}>
            Manage Teller
            <button onClick={toggle}>Create Teller</button>

            <div className={clsx(styles.listWrapper)}>
                <div className={clsx(styles.listStory)}>
                    {tellers && tellers.data && tellers.data.map(teller => <TellerItem data={teller}/>)}
                </div>
                <PaginationBar currentPage = {params.page} lastestPage = {tellers.lastestPage}/>
            </div>

            <Modal isShowing={isShowing} hide={toggle}>
                <EditTellerForm/>
            </Modal>
        </div>
    )
}
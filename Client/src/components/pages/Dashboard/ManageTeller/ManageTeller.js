import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import useModal from '../../../../hooks/useModal'
import { tellersState, tellerSuccessState } from '../../../../redux/selectors'
import EditTellerForm from './EditTellerForm'
import Modal from '../../../helpers/Modal'
import styles from "../dashboard.module.scss"
import TellerItem from "./TellerItem"
import { useDispatch, useSelector } from 'react-redux'
import { tellerSlice } from '../../../../redux/reducers/tellerSlice'
import useParams from '../../../../hooks/useParams'
import PaginationBar from '../../../helpers/PaginationBar'
import { CREATE_BTN, TELLER } from '../../../../constants'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
export default function ManageTeller(){
    const {isShowing,toggle} = useModal()
    const tellers = useSelector(tellersState)
    const isSuccess = useSelector(tellerSuccessState)
    const params = useParams("page")
    const [refresh,setRefresh] = useState(false)

    const dispatch = useDispatch()
    const RefreshData = useCallback(()=>{
        setRefresh(!refresh)
    },[refresh])

    useEffect(()=>{
        dispatch(tellerSlice.actions.getTellersRequest({page: params.page}))
    },[dispatch, params.page, refresh])

    useEffect(()=>{
        if(isSuccess.createTeller===1||isSuccess.updateTeller===1||isSuccess.deleteTeller===1){
            dispatch(tellerSlice.actions.resetIsSuccess())
            RefreshData()
        }
    },[dispatch, RefreshData, isSuccess.createTeller, isSuccess.updateTeller, isSuccess.deleteTeller])

    return(
        <div className={clsx(styles.wrapper)}>
            <div className='m-10'>
            <button onClick={toggle} className="edit_btn">{`${CREATE_BTN} ${TELLER}`}</button>
            </div>
            <div className={clsx(styles.listWrapper)}>
                <div hidden={isSuccess.getTellers > 0}>
                    <AiOutlineLoading3Quarters className='rotate loading-relative'/>
                </div>
                <div className={clsx(styles.listStory)}>
                    {tellers && tellers.data && tellers.data.map(teller => <TellerItem key={teller._id} data={teller}/>)}
                </div>
                <PaginationBar currentPage = {params.page} lastestPage = {tellers.lastestPage}/>
            </div>

            <Modal isShowing={isShowing} hide={toggle}>
                <EditTellerForm onSubmit={toggle}/>
            </Modal>
        </div>
    )
}
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import useModal from '../../../../hooks/useModal'
import { tellersState, tellerSuccessState } from '../../../../redux/selectors'
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
    const tellers = useSelector(tellersState)
    const isSuccess = useSelector(tellerSuccessState)
    const params = useParams("page")
    const [refresh,setRefresh] = useState(false)

    const dispatch = useDispatch()
    const RefreshData = ()=>{
        setRefresh(!refresh)
    }

    useEffect(()=>{
        console.log("GOI VAO DAY")
        dispatch(tellerSlice.actions.getTellersRequest({page: params.page}))
    },[dispatch, params.page, refresh])

    useEffect(()=>{
        if(isSuccess.createTeller==1||isSuccess.updateTeller==1||isSuccess.deleteTeller==1){
            dispatch(tellerSlice.actions.resetIsSuccess())
            RefreshData()
        }
        // if ==2 return error
    },[isSuccess.createTeller, isSuccess.updateTeller, isSuccess.deleteTeller])

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
                <EditTellerForm onSubmit={toggle}/>
            </Modal>
        </div>
    )
}
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import useModal from '../../../../hooks/useModal'
import { authorsState, authorSuccessState } from '../../../../redux/selectors'
import Modal from '../../../helpers/Modal'
import styles from "../dashboard.module.scss"
import AuthorItem from "./AuthorItem"
import { useDispatch, useSelector } from 'react-redux'
import { authorSlice } from '../../../../redux/reducers/authorSlice'
import EditAuthorForm from './EditAuthorForm'
import useParams from '../../../../hooks/useParams'
import PaginationBar from '../../../helpers/PaginationBar'
import { AUTHOR, CREATE_BTN } from '../../../../constants'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function ManageAuthor(){
    const {isShowing,toggle} = useModal()

    const dispatch = useDispatch()
    const authors = useSelector(authorsState)
    const isSuccess = useSelector(authorSuccessState)
    const params = useParams("page")
    const [refresh,setRefresh] = useState(false)
    const RefreshData = useCallback(()=>{
        setRefresh(!refresh)
    },[refresh])

    useEffect(()=>{
        dispatch(authorSlice.actions.getAuthorsRequest({page: params.page}))
        // dispatch(authorSlice.actions.resetIsSuccess())
    },[dispatch, params.page, refresh])
  
    useEffect(()=>{
        if(isSuccess.createAuthor===1||isSuccess.updateAuthor===1||isSuccess.deleteAuthor===1){
            dispatch(authorSlice.actions.resetIsSuccess())
            RefreshData()
        }
        // if ===2 return error
    },[dispatch, RefreshData, isSuccess.createAuthor, isSuccess.updateAuthor, isSuccess.deleteAuthor])

    return(
        <div className={clsx(styles.wrapper)}>
            <div className='m-10'>
            <button onClick={toggle} className="edit_btn">{`${CREATE_BTN} ${AUTHOR}`}</button>
            </div>
            <div className={clsx(styles.listWrapper)}>
                <div hidden={isSuccess.getAuthors > 0}>
                    <AiOutlineLoading3Quarters className='rotate loading-relative'/>
                </div>
                <div className={clsx(styles.listStory)}>
                    {authors && authors.data && authors.data.map(author => <AuthorItem key={author._id} data={author}/>)}
                </div>
                <PaginationBar currentPage = {params.page} lastestPage = {authors.lastestPage}/>
            </div>

            <Modal isShowing={isShowing} hide={toggle}>
                <EditAuthorForm onSubmit={toggle}/>
            </Modal>
        </div>
    )
}
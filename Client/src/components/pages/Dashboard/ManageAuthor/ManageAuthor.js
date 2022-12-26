import clsx from 'clsx'
import { useEffect } from 'react'
import useModal from '../../../../hooks/useModal'
import { authorsState } from '../../../../redux/selectors'
import Modal from '../../../helpers/Modal'
import styles from "../dashboard.module.scss"
import AuthorItem from "./AuthorItem"
import { useDispatch, useSelector } from 'react-redux'
import { authorSlice } from '../../../../redux/reducers/authorSlice'
import EditAuthorForm from '../../../helpers/EditAuthorForm'
import useParams from '../../../../hooks/useParams'
import PaginationBar from '../../../helpers/PaginationBar'

export default function ManageAuthor(){
    const {isShowing,toggle} = useModal()

    const dispatch = useDispatch()
    const authors = useSelector(authorsState)
    const params = useParams("page")

    useEffect(()=>{
        dispatch(authorSlice.actions.getAuthorsRequest({page: params.page}))
    },[dispatch,params.page])
  


    return(
        <div className={clsx("container",styles.wrapper)}>
            Manage Author
            <button onClick={toggle}>Create Author</button>
            
            {/* <Link to={'/dashboard/teller/create'}> Thêm truyện</Link> */}
            <div className={clsx(styles.listWrapper)}>
                <div className={clsx(styles.listStory)}>
                    {authors && authors.data && authors.data.map(author => <AuthorItem data={author}/>)}
                </div>
                <PaginationBar currentPage = {params.page} lastestPage = {authors.lastestPage}/>
            </div>

            <Modal isShowing={isShowing} hide={toggle}>
                <EditAuthorForm/>
            </Modal>
        </div>
    )
}
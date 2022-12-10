import clsx from 'clsx'
import { useEffect } from 'react'
import useModal from '../../../hooks/useModal'
import { authorsState } from '../../../redux/selectors'
import Modal from '../../helpers/Modal'
import styles from "./dashboard.module.scss"
import AuthorItem from "./AuthorItem"
import { useDispatch, useSelector } from 'react-redux'
import { authorSlice } from '../../../redux/reducers/authorSlice'
import CreateAuthorForm from '../../helpers/CreateAuthorForm'

export default function ManageAuthor(){
    const fakeAuthors = [
        {
            name:"MC Trần Vinh",
            _id : "123",
            birthDay: "19/09/2000",
            username: "@mctranvinh",
            img: "https://secure.gravatar.com/avatar/36a7abced5c929ba7572c5ad29a6eff7?s=128&d=mm&r=g"
        },
        {
            name:"MC Trần Vinh 2",
            _id : "23",
            birthDay: "19/09/2000",
            username: "@mctranvinh",
            img: "https://secure.gravatar.com/avatar/36a7abced5c929ba7572c5ad29a6eff7?s=128&d=mm&r=g"

        },
        {
            name:"MC Trần Vinh 3",
            _id : "34",
            birthDay: "19/09/2000",
            username: "@mctranvinh",
            img: "https://secure.gravatar.com/avatar/36a7abced5c929ba7572c5ad29a6eff7?s=128&d=mm&r=g"
        }
    ]

    const {isShowing,toggle} = useModal()

    const dispatch = useDispatch()
    const authors = useSelector(authorsState)

    useEffect(()=>{
        dispatch(authorSlice.actions.getAuthorsRequest())

    },[dispatch])

    return(
        <div className={clsx("container",styles.wrapper)}>
            Manage Author
            <button onClick={toggle}>Create Author</button>
            
            {/* <Link to={'/dashboard/teller/create'}> Thêm truyện</Link> */}
            <div className={clsx(styles.listWrapper)}>
                <div className={clsx(styles.listStory)}>
                    {authors.map(author => <AuthorItem data={author}/>)}
                </div>
            </div>

            <Modal isShowing={isShowing} hide={toggle}>
                <CreateAuthorForm/>
            </Modal>
        </div>
    )
}
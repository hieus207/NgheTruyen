import clsx from 'clsx'
import { useEffect } from 'react'
import useModal from '../../../../hooks/useModal'
import { categoriesState } from '../../../../redux/selectors'
import Modal from '../../../helpers/Modal'
import styles from "../dashboard.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import { categorySlice } from '../../../../redux/reducers/categorySlice'
import EditCategoryForm from '../../../helpers/EditCategoryForm'
import CategoryItem from './CategoryItem'
import useParams from '../../../../hooks/useParams'
import PaginationBar from '../../../helpers/PaginationBar'

export default function ManageCategory(){

    const {isShowing,toggle} = useModal()

    const dispatch = useDispatch()
    const categories = useSelector(categoriesState)
    const params = useParams("page")

    useEffect(()=>{
        dispatch(categorySlice.actions.getCategoriesRequest({page: params.page}))

    },[dispatch,params.page])

    return(
        <div className={clsx("container",styles.wrapper)}>
            Manage Category
            <button onClick={toggle}>Create Category</button>
            
            {/* <Link to={'/dashboard/teller/create'}> Thêm truyện</Link> */}
            <div className={clsx(styles.listWrapper)}>
                <div className={clsx(styles.listStory)}>
                    {categories && categories.data && categories.data.map(category => <CategoryItem data={category}/>)}
                </div>
                <PaginationBar currentPage = {params.page} lastestPage = {categories.lastestPage}/>
            </div>

            <Modal isShowing={isShowing} hide={toggle}>
                <EditCategoryForm/>
            </Modal>
        </div>
    )
}
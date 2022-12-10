import clsx from 'clsx'
import { useEffect } from 'react'
import useModal from '../../../hooks/useModal'
import { categoriesState } from '../../../redux/selectors'
import Modal from '../../helpers/Modal'
import styles from "./dashboard.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import { categorySlice } from '../../../redux/reducers/categorySlice'
import CreateCategoryForm from '../../helpers/CreateCategoryForm'
import CategoryItem from './CategoryItem'

export default function ManageCategory(){

    const {isShowing,toggle} = useModal()

    const dispatch = useDispatch()
    const categories = useSelector(categoriesState)

    useEffect(()=>{
        dispatch(categorySlice.actions.getCategoriesRequest())

    },[dispatch])

    return(
        <div className={clsx("container",styles.wrapper)}>
            Manage Category
            <button onClick={toggle}>Create Category</button>
            
            {/* <Link to={'/dashboard/teller/create'}> Thêm truyện</Link> */}
            <div className={clsx(styles.listWrapper)}>
                <div className={clsx(styles.listStory)}>
                    {categories.map(category => <CategoryItem data={category}/>)}
                </div>
            </div>

            <Modal isShowing={isShowing} hide={toggle}>
                <CreateCategoryForm/>
            </Modal>
        </div>
    )
}
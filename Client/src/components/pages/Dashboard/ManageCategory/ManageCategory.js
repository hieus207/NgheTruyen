import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import useModal from '../../../../hooks/useModal'
import { categoriesState, categorySuccessState } from '../../../../redux/selectors'
import Modal from '../../../helpers/Modal'
import styles from "../dashboard.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import { categorySlice } from '../../../../redux/reducers/categorySlice'
import EditCategoryForm from './EditCategoryForm'
import CategoryItem from './CategoryItem'
import useParams from '../../../../hooks/useParams'
import PaginationBar from '../../../helpers/PaginationBar'
import { CATEGORY, CREATE_BTN } from '../../../../constants'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function ManageCategory(){

    const {isShowing,toggle} = useModal()

    const dispatch = useDispatch()
    const categories = useSelector(categoriesState)
    const params = useParams("page")
    const isSuccess = useSelector(categorySuccessState)
    const [refresh,setRefresh] = useState(false)
    const RefreshData = useCallback(()=>{
        setRefresh(!refresh)
    },[refresh])
    useEffect(()=>{
        dispatch(categorySlice.actions.getCategoriesRequest({page: params.page}))

    },[dispatch, params.page, refresh])

    useEffect(()=>{
        if(isSuccess.createCategory===1||isSuccess.updateCategory===1||isSuccess.deleteCategory===1){
            dispatch(categorySlice.actions.resetIsSuccess())
            RefreshData()
        }
        // if ===2 return error
    },[dispatch, RefreshData,isSuccess.createCategory, isSuccess.updateCategory, isSuccess.deleteCategory])

    return(
        <div className={clsx("",styles.wrapper)}>
            <div className='m-10'>
            <button onClick={toggle} className="edit_btn">{`${CREATE_BTN} ${CATEGORY}`}</button>
            </div>
            <div className={clsx(styles.listWrapper)}>
                <div hidden={isSuccess.getCategories > 0}>
                    <AiOutlineLoading3Quarters className='rotate loading-relative'/>
                </div>
                <div className={clsx(styles.listStory)}>
                    {categories && categories.data && categories.data.map(category => <CategoryItem key={category._id} data={category}/>)}
                </div>
                <PaginationBar currentPage = {params.page} lastestPage = {categories.lastestPage}/>
            </div>

            <Modal isShowing={isShowing} hide={toggle}>
                <EditCategoryForm onSubmit={toggle}/>
            </Modal>
        </div>
    )
}
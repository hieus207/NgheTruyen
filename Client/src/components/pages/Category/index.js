import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { categoriesState } from '../../../redux/selectors';
import { categorySlice } from '../../../redux/reducers/categorySlice';
import { CATEGORY } from '../../../constants';
import CategoryList from '../../helpers/CategoryList';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Category(){
    const dispatch = useDispatch()
    const categories = useSelector(categoriesState)
    useEffect(()=>{
        dispatch(categorySlice.actions.getCategoriesRequest({all:true}))
    },[dispatch])

    return(
        <div className={clsx("mh-i")}>
            <div className={clsx("section")}>
                <div className='title'>{CATEGORY}</div>
                <div hidden={categories.length>0}>
                    <AiOutlineLoading3Quarters className='rotate loading'/>
                </div>
                {categories && categories.length>0 &&
                <CategoryList data={categories}/>
                }
            </div>
        </div>
    )
}
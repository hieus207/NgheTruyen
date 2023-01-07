import clsx from 'clsx'
import DefaultSection from '../../helpers/DefaultSection'
import { useParams as useParam } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { categoryStoriesState, categorySuccessState } from '../../../redux/selectors';
import { categorySlice } from '../../../redux/reducers/categorySlice';
import useParams from '../../../hooks/useParams';
import { CATEGORY } from '../../../constants';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function CateStories(){
    const { categoryId } = useParam();
    const dispatch = useDispatch()
    const stories = useSelector(categoryStoriesState)
    const isSuccess = useSelector(categorySuccessState)

    const params = useParams("page","name")
    useEffect(()=>{
        dispatch(categorySlice.actions.getCategoryStoriesRequest({id:categoryId, page: params.page}))
    },[dispatch, categoryId, params.page])
    
    return(
        <div className={clsx("mh-i")}>
            <div hidden={isSuccess.getCategoryStories !== 0}>
                <AiOutlineLoading3Quarters className='rotate loading'/>
            </div>
            {stories && stories.data && isSuccess.getCategoryStories===1&& <DefaultSection name={`${CATEGORY}: ${params.name?params.name:""}`} data={stories.data} querry={false} currentPage={params.page} lastestPage={stories.lastestPage} fullHeight/>}
        </div>
    )
}
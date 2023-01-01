import clsx from 'clsx'
import DefaultSection from '../../helpers/DefaultSection'
import fakeStories from "../../../mocks/story.json"
import { useParams as useParam } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { categoryStoriesState } from '../../../redux/selectors';
import { categorySlice } from '../../../redux/reducers/categorySlice';
import useParams from '../../../hooks/useParams';

export default function Category(){
    const { categoryId } = useParam();
    const dispatch = useDispatch()
    const stories = useSelector(categoryStoriesState)
    const params = useParams("page","name")
    useEffect(()=>{
        dispatch(categorySlice.actions.getCategoryStoriesRequest({id:categoryId, page: params.page}))
    },[dispatch, categoryId, params.page])

    return(
        <div className={clsx("")}>
            {stories && stories.data && <DefaultSection name={`Thể loại ${params.name?params.name:""}`} data={stories.data} querry={false} currentPage={params.page} lastestPage={stories.lastestPage}/>}
            {stories && stories.data && stories.data.length==0 && <>Không có kết quả</>}
        </div>
    )
}
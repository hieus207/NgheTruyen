import clsx from 'clsx'
import DefaultSection from '../../helpers/DefaultSection'
import fakeStories from "../../../mocks/story.json"
import useParams from "../../../hooks/useParams"
import { useDispatch, useSelector } from 'react-redux';
import { tellerSlice } from '../../../redux/reducers/tellerSlice';
import { tellerStoriesState } from '../../../redux/selectors';
import { useEffect } from 'react';
import { useParams as useParam } from 'react-router-dom';

export default function Teller(){
    const { tellerId } = useParam();
    const dispatch = useDispatch()
    const stories = useSelector(tellerStoriesState)
    const params = useParams("page","name")
    useEffect(()=>{
        dispatch(tellerSlice.actions.getTellersStoriesRequest({id: tellerId, page: params.page}))
    },[dispatch, tellerId, params.page])

    return(
        <div className={clsx("")}>
            {stories && stories.data && <DefaultSection name={`Người đọc  ${params.name?params.name:""}`} data={stories.data} querry={false} currentPage={params.page} lastestPage={stories.lastestPage}/>}
            {stories && stories.data && stories.data.length==0 && <>Không có kết quả</>}

        </div>
    )
}
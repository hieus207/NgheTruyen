import clsx from 'clsx'
import DefaultSection from '../../helpers/DefaultSection'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { storiesMostViewState, storiesSuccessState } from '../../../redux/selectors';
import useParams from '../../../hooks/useParams';
import { storySlice } from '../../../redux/reducers/storySlice';
import { STORY_MOSTVIEW } from '../../../constants';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function MostView(){
    const dispatch = useDispatch()
    const storiesMostView = useSelector(storiesMostViewState)
    const isSuccess = useSelector(storiesSuccessState)
    const params = useParams("page")
    
    useEffect(()=>{
        dispatch(storySlice.actions.getStoriesMostViewRequest({page: params.page}))
    },[dispatch, params.page])

    return(
        <div className={clsx("mh-i")}>
            <div hidden={isSuccess.getStoriesMostView !== 0}>
                <AiOutlineLoading3Quarters className='rotate loading'/>
            </div>
            {storiesMostView && storiesMostView.data && isSuccess.getStoriesMostView === 1 && 
            <DefaultSection name={STORY_MOSTVIEW} data={storiesMostView.data} querry={false} currentPage={params.page} lastestPage={storiesMostView.lastestPage} fullHeight/>
            }
        </div>
    )
}
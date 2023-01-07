import DefaultSection from '../../helpers/DefaultSection'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { storiesRecentState, storiesSuccessState } from '../../../redux/selectors';
import useParams from '../../../hooks/useParams';
import { storySlice } from '../../../redux/reducers/storySlice';
import { STORY_RECENT } from '../../../constants';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Recent(){
    const dispatch = useDispatch()
    const storiesRecent = useSelector(storiesRecentState)
    const params = useParams("page")
    const isSuccess = useSelector(storiesSuccessState)
    useEffect(()=>{
        dispatch(storySlice.actions.getStoriesRecentRequest({page: params.page}))
    },[dispatch, params.page])

    return(
        <div className='mh-i'>
            <div hidden={isSuccess.getStoriesRecent !== 0}>
                <AiOutlineLoading3Quarters className='rotate loading'/>
            </div>
            {storiesRecent && storiesRecent.data && isSuccess.getStoriesRecent === 1 && <DefaultSection name={STORY_RECENT} data={storiesRecent.data} querry={false} currentPage={params.page} lastestPage={storiesRecent.lastestPage} fullHeight/>}
        </div>
    )
}
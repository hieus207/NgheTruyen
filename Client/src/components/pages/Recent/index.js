import clsx from 'clsx'
import DefaultSection from '../../helpers/DefaultSection'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { storiesRecentState } from '../../../redux/selectors';
import useParams from '../../../hooks/useParams';
import { storySlice } from '../../../redux/reducers/storySlice';

export default function Recent(){
    const dispatch = useDispatch()
    const storiesRecent = useSelector(storiesRecentState)
    const params = useParams("page")
    
    useEffect(()=>{
        dispatch(storySlice.actions.getStoriesRecentRequest({page: params.page}))
    },[dispatch, params.page])

    return(
        <div className={clsx("container")}>
            {storiesRecent && storiesRecent.data && <DefaultSection name={"Truyện mới cập nhật"} data={storiesRecent.data} querry={false} currentPage={params.page} lastestPage={storiesRecent.lastestPage}/>}
        </div>
    )
}
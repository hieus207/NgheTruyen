import clsx from 'clsx'
import DefaultSection from '../../helpers/DefaultSection'
import fakeStories from "../../../mocks/story.json"
import { useParams as useParam } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authorSlice } from '../../../redux/reducers/authorSlice';
import { authorStoriesState } from '../../../redux/selectors';
import useParams from '../../../hooks/useParams';

export default function Author(){
    const { authorId } = useParam();
    const dispatch = useDispatch()
    const stories = useSelector(authorStoriesState)
    const params = useParams("page")


    useEffect(()=>{
        dispatch(authorSlice.actions.getAuthorStoriesRequest({id: authorId,page: params.page}))
    },[dispatch,authorId, params.page])

    return(
        <div className={clsx("container")}>
            {stories && stories.data && <DefaultSection name={"Author"} data={stories.data} querry={false} currentPage={params.page} lastestPage={stories.lastestPage}/>}
        </div>
    )
}
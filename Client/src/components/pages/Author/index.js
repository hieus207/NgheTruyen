import clsx from 'clsx'
import DefaultSection from '../../helpers/DefaultSection'
import fakeStories from "../../../mocks/story.json"
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authorSlice } from '../../../redux/reducers/authorSlice';
import { authorStoriesState } from '../../../redux/selectors';

export default function Author(){
    const { authorId } = useParams();
    const dispatch = useDispatch()
    const stories = useSelector(authorStoriesState)

    useEffect(()=>{
        dispatch(authorSlice.actions.getAuthorStoriesRequest(authorId))
    },[dispatch,authorId])

    return(
        <div className={clsx("container")}>
            <DefaultSection name={"Author"} data={stories} querry={false}/>
        </div>
    )
}
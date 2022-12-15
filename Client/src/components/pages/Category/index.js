import clsx from 'clsx'
import DefaultSection from '../../helpers/DefaultSection'
import fakeStories from "../../../mocks/story.json"
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { categoryStoriesState } from '../../../redux/selectors';
import { categorySlice } from '../../../redux/reducers/categorySlice';

export default function Category(){
    const { categoryId } = useParams();
    const dispatch = useDispatch()
    const stories = useSelector(categoryStoriesState)

    useEffect(()=>{
        dispatch(categorySlice.actions.getCategoryStoriesRequest(categoryId))
    },[dispatch, categoryId])

    return(
        <div className={clsx("container")}>
            <DefaultSection name={"Category"} data={stories} querry={false}/>
        </div>
    )
}
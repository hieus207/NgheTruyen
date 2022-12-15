import clsx from 'clsx'
import DefaultSection from '../../helpers/DefaultSection'
import fakeStories from "../../../mocks/story.json"
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { tellerSlice } from '../../../redux/reducers/tellerSlice';
import { tellerStoriesState } from '../../../redux/selectors';
import { useEffect } from 'react';

export default function Teller(){
    const { tellerId } = useParams();
    const dispatch = useDispatch()
    const stories = useSelector(tellerStoriesState)

    useEffect(()=>{
        dispatch(tellerSlice.actions.getTellersStoriesRequest(tellerId))
    },[dispatch,tellerId])

    return(
        <div className={clsx("container")}>
            <DefaultSection name={"Teller"} data={stories} querry={false}/>
        </div>
    )
}
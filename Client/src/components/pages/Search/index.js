import clsx from 'clsx'
import DefaultSection from '../../helpers/DefaultSection'
import fakeStories from "../../../mocks/story.json"
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';
import {useDispatch, useSelector} from "react-redux"

import { storiesState } from '../../../redux/selectors';
import { storySlice } from '../../../redux/reducers/storySlice';

export default function Search(){
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch()

    useEffect(()=>{
        // console.log(searchParams.get("name"))
        dispatch(storySlice.actions.getStoriesRequest(searchParams.get("name")))
    },[dispatch,searchParams.get("name")])

    const result = useSelector(storiesState)

    return(
        <div className={clsx("container")}>
            <DefaultSection name={"Search"} data={result} querry={false}/>
        </div>
    )
}
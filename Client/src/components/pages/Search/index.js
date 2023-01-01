import clsx from 'clsx'
import DefaultSection from '../../helpers/DefaultSection'
import fakeStories from "../../../mocks/story.json"
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import useParams from "../../../hooks/useParams"
import { storiesState } from '../../../redux/selectors';
import { storySlice } from '../../../redux/reducers/storySlice';

export default function Search(){
    const params = useParams("name","page")
    const dispatch = useDispatch()
    const result = useSelector(storiesState)

    useEffect(()=>{
        dispatch(storySlice.actions.getStoriesRequest({name: params.name, page: params.page}))
    },[dispatch, params.name, params.page])

    return(
        <div className={clsx("")}>
            <DefaultSection name={`Tìm kiếm: ${params.name?params.name:"Tất cả"}`} data={result.data} querry={false} currentPage={params.page} lastestPage={result.lastestPage}/>
        </div>
    )
}
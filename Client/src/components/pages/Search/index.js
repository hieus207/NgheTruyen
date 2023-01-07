import clsx from 'clsx'
import DefaultSection from '../../helpers/DefaultSection'
import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux"
import useParams from "../../../hooks/useParams"
import { storiesState, storiesSuccessState } from '../../../redux/selectors';
import { storySlice } from '../../../redux/reducers/storySlice';
import { SEARCH } from '../../../constants';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Search(){
    const params = useParams("name","page")
    const dispatch = useDispatch()
    const result = useSelector(storiesState)
    const isSuccess = useSelector(storiesSuccessState)
    useEffect(()=>{
        dispatch(storySlice.actions.getStoriesRequest({name: params.name, page: params.page}))
    },[dispatch, params.name, params.page])

    return(
        <div className={clsx("mh-i")}>
            <div hidden={isSuccess.getStories !== 0}>
                <AiOutlineLoading3Quarters className='rotate loading'/>
            </div>
            {isSuccess.getStories ===1 && 
            <DefaultSection name={`${SEARCH}: ${params.name?params.name:"Tất cả"}`} data={result.data} querry={false} currentPage={params.page} lastestPage={result.lastestPage} fullHeight/>
            }
        </div>
    )
}
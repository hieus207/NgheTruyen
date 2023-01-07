import clsx from 'clsx'
import DefaultSection from '../../helpers/DefaultSection'
import useParams from "../../../hooks/useParams"
import { useDispatch, useSelector } from 'react-redux';
import { tellerSlice } from '../../../redux/reducers/tellerSlice';
import { tellerStoriesState,tellerSuccessState } from '../../../redux/selectors';
import { useEffect } from 'react';
import { useParams as useParam } from 'react-router-dom';
import { TELLER } from '../../../constants';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function TellerStories(){
    const { tellerId } = useParam();
    const dispatch = useDispatch()
    const stories = useSelector(tellerStoriesState)
    const isSuccess = useSelector(tellerSuccessState)

    const params = useParams("page","name")
    useEffect(()=>{
        dispatch(tellerSlice.actions.getTellersStoriesRequest({id: tellerId, page: params.page}))
    },[dispatch, tellerId, params.page])

    return(
        <div className={clsx("mh-i")}>
            <div hidden={isSuccess.getTellersStories!==0}>
                <AiOutlineLoading3Quarters className='rotate loading'/>
            </div>
            {stories && stories.data && isSuccess.getTellersStories === 1 && <DefaultSection name={`${TELLER}:  ${params.name?params.name:""}`} data={stories.data} querry={false} currentPage={params.page} lastestPage={stories.lastestPage} fullHeight/>}
        </div>
    )
}
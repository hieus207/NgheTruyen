import clsx from 'clsx'
import DefaultSection from '../../helpers/DefaultSection'
import { useParams as useParam } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { storiesMostViewState } from '../../../redux/selectors';
import useParams from '../../../hooks/useParams';
import { storySlice } from '../../../redux/reducers/storySlice';

export default function MostView(){
    const dispatch = useDispatch()
    const storiesMostView = useSelector(storiesMostViewState)
    const params = useParams("page")


    
    useEffect(()=>{
        dispatch(storySlice.actions.getStoriesMostViewRequest({page: params.page}))
    },[dispatch, params.page])

    return(
        <div className={clsx("container")}>
            {storiesMostView && storiesMostView.data && <DefaultSection name={"Truyện nhiều lượt nghe"} data={storiesMostView.data} querry={false} currentPage={params.page} lastestPage={storiesMostView.lastestPage}/>}
        </div>
    )
}
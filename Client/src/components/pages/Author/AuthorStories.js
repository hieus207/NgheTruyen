import DefaultSection from '../../helpers/DefaultSection'
import { useParams as useParam } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authorSlice } from '../../../redux/reducers/authorSlice';
import { authorStoriesState, authorSuccessState } from '../../../redux/selectors';
import useParams from '../../../hooks/useParams';
import { AUTHOR } from '../../../constants';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function AuthorStories(){
    const { authorId } = useParam();
    const dispatch = useDispatch()
    const stories = useSelector(authorStoriesState)
    const isSuccess = useSelector(authorSuccessState)

    const params = useParams("page","name")


    useEffect(()=>{
        dispatch(authorSlice.actions.getAuthorStoriesRequest({id: authorId,page: params.page}))
    },[dispatch,authorId, params.page])

    return(
        <div className='mh-i'>
            <div hidden={isSuccess.getAuthorStories !== 0}>
                <AiOutlineLoading3Quarters className='rotate loading'/>
            </div>
            {stories && stories.data && isSuccess.getAuthorStories === 1 && <DefaultSection name={`${AUTHOR}: ${params.name?params.name:""}`} data={stories.data} querry={false} currentPage={params.page} lastestPage={stories.lastestPage} fullHeight/>}
        </div>
    )
}
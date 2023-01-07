import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authorSlice } from '../../../redux/reducers/authorSlice';
import { authorsState, authorSuccessState } from '../../../redux/selectors';
import { AUTHOR } from '../../../constants';
import AuthorList from '../../helpers/AuthorList';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Author(){
    const dispatch = useDispatch()
    const authors = useSelector(authorsState)
    const isSuccess = useSelector(authorSuccessState)

    useEffect(()=>{
        dispatch(authorSlice.actions.getAuthorsRequest({all:true}))
    },[dispatch])
   
    return(
        <div className={clsx("mh-i")}>

            
                <div className={clsx("section")}>
                    <div className='title'>{AUTHOR}</div>
                    <div hidden={isSuccess.getAuthors > 0}>
                        <AiOutlineLoading3Quarters className='rotate loading'/>
                    </div>
                    {isSuccess.getAuthors === 1 && authors.length > 0 &&
                    <AuthorList data={authors}/>
                    }
                </div>
        </div>
    )
}
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux';
import { tellerSlice } from '../../../redux/reducers/tellerSlice';
import { tellersState, tellerSuccessState } from '../../../redux/selectors';
import { useEffect } from 'react';
import { TELLER } from '../../../constants';
import TellerList from '../../helpers/TellerList';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Teller(){
    const dispatch = useDispatch()
    const tellers = useSelector(tellersState)
    const isSuccess = useSelector(tellerSuccessState)
    useEffect(()=>{
        dispatch(tellerSlice.actions.getTellersRequest({all:true}))
    },[dispatch])

    return(
        <div className={clsx("mh-i")}>
                <div className={clsx("section")}>
                    <div className='title'>{TELLER}</div>
                    <div hidden={isSuccess.getTellers>0}>
                        <AiOutlineLoading3Quarters className='rotate loading'/>
                    </div>
                    {isSuccess.getTellers === 1 && tellers.length > 0 &&
                    <TellerList data={tellers}/>
                     }
                </div>
        </div>
    )
}
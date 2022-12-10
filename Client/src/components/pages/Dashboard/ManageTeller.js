import clsx from 'clsx'
import { useEffect } from 'react'
import useModal from '../../../hooks/useModal'
import { tellersState } from '../../../redux/selectors'
import CreateTellerForm from '../../helpers/CreateTellerForm'
import Modal from '../../helpers/Modal'
import styles from "./dashboard.module.scss"
import TellerItem from "./TellerItem"
import { useDispatch, useSelector } from 'react-redux'
import { tellerSlice } from '../../../redux/reducers/tellerSlice'
export default function ManageTeller(){
    const fakeTeller = [
        {
            name:"MC Trần Vinh",
            _id : "123",
            birthDay: "19/09/2000",
            username: "@mctranvinh",
            img: "https://secure.gravatar.com/avatar/36a7abced5c929ba7572c5ad29a6eff7?s=128&d=mm&r=g"
        },
        {
            name:"MC Trần Vinh 2",
            _id : "23",
            birthDay: "19/09/2000",
            username: "@mctranvinh",
            img: "https://secure.gravatar.com/avatar/36a7abced5c929ba7572c5ad29a6eff7?s=128&d=mm&r=g"

        },
        {
            name:"MC Trần Vinh 3",
            _id : "34",
            birthDay: "19/09/2000",
            username: "@mctranvinh",
            img: "https://secure.gravatar.com/avatar/36a7abced5c929ba7572c5ad29a6eff7?s=128&d=mm&r=g"
        }
    ]

    const {isShowing,toggle} = useModal()

    const dispatch = useDispatch()
    const tellers = useSelector(tellersState)

    useEffect(()=>{
        dispatch(tellerSlice.actions.getTellersRequest())
        console.log(tellers)
    },[dispatch])

    return(
        <div className={clsx("container",styles.wrapper)}>
            Manage Teller
            <button onClick={toggle}>Create Teller</button>
            
            {/* <Link to={'/dashboard/teller/create'}> Thêm truyện</Link> */}
            <div className={clsx(styles.listWrapper)}>
                <div className={clsx(styles.listStory)}>
                    {tellers.map(teller => <TellerItem data={teller}/>)}
                </div>
            </div>

            <Modal isShowing={isShowing} hide={toggle}>
                <CreateTellerForm/>
            </Modal>
        </div>
    )
}
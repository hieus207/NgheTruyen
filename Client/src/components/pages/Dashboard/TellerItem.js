import clsx from 'clsx'
import Image from '../../helpers/Image'
import styles from "./dashboard.module.scss"

export default function TellerItem({data}){
    return(
        <div className={clsx(styles.storyWrapper)}>
            <div className={clsx("d-flex m-10 flex-wrap")}>
                <Image src={data.img} alt={"Img for "+data.name} thumb/>
                <div className={clsx(styles.metadata,"m-left-20")}>
                    <div>{data.name}</div>
                    <div>{data.birthDay}</div>
                    <div>{data.username}</div>
                    <button>Sửa</button>

                    <button>Xoá</button>
                </div>
            </div>
        </div>

    )
}
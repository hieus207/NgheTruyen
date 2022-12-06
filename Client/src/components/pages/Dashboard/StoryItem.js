import clsx from 'clsx'
import Image from '../../helpers/Image'
import styles from "./dashboard.module.scss"
import Link from "../../helpers/Link"
export default function StoryItem({data}){
    return(
        <div className={clsx(styles.storyWrapper)}>
            <div className={clsx("d-flex m-10 flex-wrap")}>
                <Image src={data.img} alt={"Img for "+data.name} thumb/>
                <div className={clsx(styles.metadata,"m-left-20")}>
                    <div><Link to={"/dashboard/story"}>{data.name}</Link></div>
                    <div>{data.author}</div>
                    <div>{data.teller}</div>
                    <div>{data.chap}</div>
                    <button>Xoá</button>
                </div>
            </div>
        </div>

    )
}
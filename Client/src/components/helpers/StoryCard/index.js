import Link from "../Link"
import clsx from "clsx"
import styles from "./storyCard.module.scss"
export default function StoryCard({data,small=false}){
    return(
        <div className={clsx({
            [styles.card]:!small,
            [styles.card_small]:small
        })}>
            <img src={data.img} alt={"img for "+data.name}/>
            <div className={clsx(styles.card_name)}>
                <Link to={"/"}>{data.name}</Link>
            </div>
            <div>
                {data.teller}
            </div>
            <div>
                {data.chap + " tập"}
            </div>
            <div>
                {"Lượt nghe: " + data.view}
            </div>
        </div>
    )
}
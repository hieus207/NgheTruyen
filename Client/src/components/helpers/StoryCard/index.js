import Link from "../Link"
import clsx from "clsx"
import styles from "./storyCard.module.scss"
import Image from "../Image"
export default function StoryCard({data,small=false}){
    return(
        <div className={clsx({
            [styles.card]:!small,
            [styles.card_small]:small
        })}>
            {/* <img src={data.img} alt={"img for "+data.name}/> */}
            <Image alt={"img for "+data.name} src={data.img} normal small={small}/>
            <div className={clsx(styles.card_name)}>
                <Link to={"/story/"+ data._id}>{data.name}</Link>
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
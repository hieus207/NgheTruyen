import Link from "../Link"
import clsx from "clsx"
import styles from "./storyCard.module.scss"
import Image from "../Image"
export default function StoryCard({data,small=false}){
    return(
        <div className={clsx(styles.wrapper,"round",{
            [styles.card]:!small,
            [styles.card_regular]: window.innerWidth<700,
            [styles.card_small]:small||window.innerWidth<450
        })}>
              <Link to={"/story/"+ data._id}><Image alt={"img for "+data.name} src={data.img} normal regular={window.innerWidth<700} small={window.innerWidth<450} topRound/></Link>
            <div className={clsx(styles.body)}>
                <div className={clsx(styles.card_name)}>
                    <Link to={"/story/"+ data._id}>{data.name}</Link>
                </div>
                <div>
                    {data.teller}
                </div>
                <div>
                    {"Số tập: "+ data.chap + " tập"}
                </div>
                <div>
                    {"Lượt nghe: " + data.view}
                </div>
            </div>

        </div>
    )
}
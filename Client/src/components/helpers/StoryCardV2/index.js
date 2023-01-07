import Link from "../Link"
import clsx from "clsx"
import styles from "./storyCardV2.module.scss"
import Image from "../Image"
export default function StoryCardV2({data,small=false}){
    return(
        <div className={clsx(styles.wrapper,"round d-flex p-20",{
            [styles.card]:!small,
            [styles.card_small]:small||window.innerWidth<500,
            "f-column":window.innerWidth<500
            
        })}>
            <Link to={"/story/"+ data._id} className={[styles.imgWrapper]}>
                <Image alt={"img for "+data.name} src={data.img} regular className="round"/>
            </Link>
            <div className={clsx(styles.body)}>
                <div>
                    <div className={clsx(styles.card_name)}>
                        <Link to={"/story/"+ data._id}>{data.name}</Link>
                    </div>
                    <div>
                        {data.teller}
                    </div>
                    <div>
                        {data.author}
                    </div>
                    <div>
                        {"Số tập: "+ data.chap + " tập"}
                    </div>
                    <div>
                        {"Lượt nghe: " + data.view}
                    </div>
                </div>

            </div>

        </div>
    )
}
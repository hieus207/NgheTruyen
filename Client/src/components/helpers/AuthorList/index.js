import clsx from "clsx"
import Image from "../Image"
import Link from "../Link"
import styles from "./authorList.module.scss"
export default function AuthorList({data}){
    return(
        <div className={clsx(styles.cateList)}>
            {data.map(elm=>(<div key={elm._id} className={clsx(styles.cateElement)}>
            <Link to={`/author/${elm._id}?name=${elm.name}`}>
                <Image src={elm.img} alt={"image for "+elm.name} className={clsx("round_img")}/>
                {elm.name}
                </Link>
                </div>))}
        </div>
    )
}
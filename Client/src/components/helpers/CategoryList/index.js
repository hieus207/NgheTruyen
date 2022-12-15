import clsx from "clsx"
import Image from "../Image"
import styles from "./categoryList.module.scss"
export default function CategoryList({data}){
    return(
        <div className={clsx(styles.cateList)}>
            {data.map(elm=>(<div key={elm._id} className={clsx(styles.cateElement)}>
                <Image src={elm.img} alt={"image for "+elm.name} className={clsx("round_img")}/>
                {elm.name}
                </div>))}
        </div>
    )
}
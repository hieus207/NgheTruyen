import clsx from "clsx"
import styles from "./categoryList.module.scss"
export default function CategoryList({data}){
    return(
        <div className={clsx(styles.cateList)}>
            {data.map(elm=>(<div key={elm.id} className={clsx(styles.cateElement)}>
                <img src={elm.img} alt={"image for "+elm.name} className={clsx("round_img")}/>
                {elm.name}
                </div>))}
        </div>
    )
}
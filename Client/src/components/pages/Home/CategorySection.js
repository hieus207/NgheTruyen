import clsx from "clsx"
import CategoryList from "../../helpers/CategoryList"

export default function CategorySection({data}){

    return(
        <div className={clsx("section")}>
            <CategoryList data={data}/>
        </div>
    )
}
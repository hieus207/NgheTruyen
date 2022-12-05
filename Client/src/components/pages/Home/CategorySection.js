import clsx from "clsx"
import CategoryList from "../../helpers/CategoryList"

export default function CategorySection(){
    const fakeCategories = [
        {
            id: 0,
            name: "Tiên hiệp",
            img: "https://truyenaudio.org/upload/images/intro/kiemhiep2018.jpg",
        },
        {
            id: 1,
            name: "Trinh thám",
            img: "https://radiotruyen.info/upload/images/intro/trinh-tham-hinh-su.jpg",
        },
        {
            id: 2,
            name: "Lịch sử",
            img: "https://truyenaudio.org/upload/images/intro/icon.png",
        },
        {
            id: 3,
            name: "Lịch sử",
            img: "https://truyenaudio.org/upload/images/intro/icon.png",
        },
        {
            id: 4,
            name: "Lịch sử",
            img: "https://truyenaudio.org/upload/images/intro/icon.png",
        }
    ]
    return(
        <div className={clsx("section")}>
            <CategoryList data={fakeCategories}/>
        </div>
    )
}
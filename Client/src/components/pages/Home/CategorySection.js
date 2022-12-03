import CategoryList from "../../helpers/CategoryList"

export default function CategorySection(){
    const categories = [
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
        },
        {
            id: 5,
            name: "Lịch sử",
            img: "https://truyenaudio.org/upload/images/intro/icon.png",
        },
        {
            id: 6,
            name: "Lịch sử",
            img: "https://truyenaudio.org/upload/images/intro/icon.png",
        },
        {
            id: 7,
            name: "Lịch sử",
            img: "https://truyenaudio.org/upload/images/intro/icon.png",
        },
        {
            id: 8,
            name: "Lịch sử",
            img: "https://truyenaudio.org/upload/images/intro/icon.png",
        },
        {
            id: 9,
            name: "Lịch sử",
            img: "https://truyenaudio.org/upload/images/intro/icon.png",
        },
    ]
    return(
        <div>
            Category Section
            <CategoryList data={categories}/>
        </div>
    )
}
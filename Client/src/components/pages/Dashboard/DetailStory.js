import clsx from 'clsx'
import styles from "./dashboard.module.scss"
import Image from "../../helpers/Image"
import AudioPlayer from '../../helpers/AudioPlayer'
import useModal from "../../../hooks/useModal"
import Modal from "../../helpers/Modal"
import { useState } from 'react'
export default function DetailStory(){
    const {isShowing, toggle} = useModal();
    const fakeStory= {
        id: 1,
        name: "Thế Giới Tiên Hiệp",
        chap: 56,
        chapter:[
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
        ],
        img: "https://radiotruyen.info/upload/cover/thumbnail_wm/the-gioi-tien-hiep-pt--400.jpg?v=4",
        author: "Vô Tội",
        authorId: 1,
        teller: "Phan Thuyên",
        tellerId: 1,
        category: "Tiên hiệp",
        view: 1500,
        description:`Thiên địa là quán trọ cho vạn vật chúng sinh, còn thời gian vốn là khách qua đường từ xưa đến nay.

        Sinh và tử sai biệt, sự khác biệt cũng tựa như giữa mộng và tỉnh, luôn biến hóa rối ren, không thể xét dò.
        
        Như vậy thì, nếu đã vượt qua sinh tử, đã vượt ra thiên địa, tại bên ngoài thời gian, chúng ta sẽ gặp phải điều gì nữa, và bản thân chúng ta đã là đẳng cấp gì, định nghĩa ra sao?
        
        Đây là quyển sách kế tiếp của Nhĩ Căn, sau những quyển: 《 Tiên Nghịch 》 《 Cầu Ma 》 《 Ngã Dục Phong Thiên 》 《 Nhất Niệm Vĩnh Hằng 》 《 Tam Thốn Nhân Gian 》, là quyển tiểu thuyết dài thứ 6 《 Quang Âm Chi Ngoại 》(Dịch tên truyện: Bên Ngoài Thời Gian).`
    }
    const [contentModel,setContentModel] = useState(<></>) 

    const handleUpdate = ()=>{
        setContentModel(<>Update</>)
        toggle()
    }

    const handleDelete = ()=>{
        setContentModel(<>Delete</>)
        toggle()
    }

    const handleAddChapter = () => {
        setContentModel(<>Add chapter</>)
        toggle()
    }

    return(
        <div className={clsx("container ",styles.dtWrapper)}>
            <Image src={fakeStory.img} alt={'img for ' + fakeStory.name} normal/>
            <div className={clsx(styles.rightContent)}>
                <div><h3>{fakeStory.name}</h3></div>
                <div>Tác giả: {fakeStory.author}</div>
                <div>Giọng đọc: {fakeStory.teller}</div>
                <AudioPlayer urls={fakeStory.chapter} manager onUpdate={handleUpdate} onDelete={handleDelete}/>
                <Modal isShowing={isShowing} hide={toggle}>{contentModel}</Modal>
                <button onClick={handleAddChapter}>Thêm tập</button>
            </div>
        </div>
    )
}
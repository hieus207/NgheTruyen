import styles from './home.module.scss'
import clsx from 'clsx'
import CategorySection from "./CategorySection"
import SlideSection from "./SlideSection"
import fakeStories from "../../../mocks/story.json"
import DefaultSection from '../../helpers/DefaultSection'
export default function Home(){
    return(
        <div className={clsx(styles.container)}>
            <h1>Nghe Đọc Truyện</h1>
            <CategorySection/>
            <SlideSection/>
            <DefaultSection name={"Truyện mới cập nhật"} data={fakeStories}/>
            <DefaultSection name={"Truyện nhiều lượt nghe"} data={fakeStories}/>
            <DefaultSection name={"Truyện ngẫu nhiên"} data={fakeStories}/>
        </div>
        
    )
}
import styles from './home.module.scss'
import clsx from 'clsx'
import CategorySection from "./CategorySection"
import SlideSection from "./SlideSection"
import fakeStories from "../../../mocks/story.json"
import DefaultSection from '../../helpers/DefaultSection'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { storySlice } from '../../../redux/reducers/storySlice'
import { storiesState, storiesRandomState, storiesMostViewState, storiesRecentState, categoriesState } from '../../../redux/selectors'
import { categorySlice } from '../../../redux/reducers/categorySlice'
export default function Home(){

    const dispatch = useDispatch()
    const storiesRandom = useSelector(storiesRandomState)
    const storiesMostView = useSelector(storiesMostViewState)
    const storiesRecent = useSelector(storiesRecentState)
    const categories = useSelector(categoriesState)
    useEffect(()=>{
        dispatch(storySlice.actions.getStoriesMostViewRequest())
        dispatch(storySlice.actions.getStoriesRandomRequest())
        dispatch(storySlice.actions.getStoriesRecentRequest())
        dispatch(categorySlice.actions.getCategoriesRequest())
    },[dispatch])

    const storiesSlide = storiesMostView.slice(0,3).concat(storiesRecent.slice(0,3).concat(storiesRandom.slice(0,3)))

    
    return(
        <div className={clsx(styles.container)}>
            <h1>Nghe Đọc Truyện</h1>
            <CategorySection data={categories}/>
            <SlideSection data={storiesSlide}/>
            <DefaultSection name={"Truyện mới cập nhật"} data={storiesRecent}/>
            <DefaultSection name={"Truyện nhiều lượt nghe"} data={storiesMostView}/>
            <DefaultSection name={"Truyện ngẫu nhiên"} data={storiesRandom}/>
        </div>
        
    )
}
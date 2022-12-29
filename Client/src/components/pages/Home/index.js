import styles from './home.module.scss'
import clsx from 'clsx'
import CategorySection from "./CategorySection"
import SlideSection from "./SlideSection"
import fakeStories from "../../../mocks/story.json"
import DefaultSection from '../../helpers/DefaultSection'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { storySlice } from '../../../redux/reducers/storySlice'
import {  storiesRandomState, storiesMostViewState, storiesRecentState, categoriesState } from '../../../redux/selectors'
import { categorySlice } from '../../../redux/reducers/categorySlice'
export default function Home(){

    const dispatch = useDispatch()
    const storiesRandom = useSelector(storiesRandomState)
    const storiesMostView = useSelector(storiesMostViewState)
    const storiesRecent = useSelector(storiesRecentState)
    const categories = useSelector(categoriesState)
    useEffect(()=>{
        dispatch(storySlice.actions.getStoriesMostViewRequest({page:1, limit: 5}))
        dispatch(storySlice.actions.getStoriesRandomRequest())
        dispatch(storySlice.actions.getStoriesRecentRequest({page:1, limit: 5}))
        dispatch(categorySlice.actions.getCategoriesRequest({page:1}))
    },[dispatch])

    function exportSlideStory(a,b,c){
        return a.slice(0,3).concat(b.slice(0,3).concat(c.slice(0,3)))
    }
    
    return(
        <div className={clsx(styles.container)}>
            <h1>Nghe Đọc Truyện</h1>
            {categories.data && <CategorySection data={categories.data}/>}
            {storiesMostView.data && storiesRecent.data && storiesRandom && <SlideSection data={exportSlideStory(storiesMostView.data, storiesRecent.data, storiesRandom)}/>}
            {storiesRecent && storiesRecent.data && <DefaultSection name={"Truyện mới cập nhật"} data={storiesRecent.data} path={"/recent"}/>}
            {storiesMostView && storiesMostView.data && <DefaultSection name={"Truyện nhiều lượt nghe"} data={storiesMostView.data} path={"/mostview"}/>}
            <DefaultSection name={"Truyện ngẫu nhiên"} data={storiesRandom} querry={false}/>
        </div>
    )
}
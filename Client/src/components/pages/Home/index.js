import styles from './home.module.scss'
import clsx from 'clsx'
import SlideSection from "./SlideSection"
import DefaultSection from '../../helpers/DefaultSection'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { storySlice } from '../../../redux/reducers/storySlice'
import {  storiesRandomState, storiesMostViewState, storiesRecentState, categoriesState, allCategoriesState } from '../../../redux/selectors'
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import { HOME_TITLE, STORY_MOSTVIEW, STORY_RANDOM, STORY_RECENT } from '../../../constants'
export default function Home(){

    const dispatch = useDispatch()
    const storiesRandom = useSelector(storiesRandomState)
    const storiesMostView = useSelector(storiesMostViewState)
    const storiesRecent = useSelector(storiesRecentState)

    useEffect(()=>{
        dispatch(storySlice.actions.getStoriesMostViewRequest({page:1, limit: 6}))
        dispatch(storySlice.actions.getStoriesRandomRequest({limit: 12}))
        dispatch(storySlice.actions.getStoriesRecentRequest({page:1, limit: 6}))
        // dispatch(categorySlice.actions.getCategoriesRequest({page:1, limit: 5})) //fetch in header
    },[dispatch])

    function exportSlideStory(a,b,c){
        return a.slice(0,3).concat(b.slice(0,3).concat(c.slice(0,3)))
    }

    
    return(
        <div className={clsx(styles.wrapper)}>
            <h2>{HOME_TITLE}</h2>
            <div hidden={storiesMostView.data && storiesRecent.data && storiesRandom}>
                <AiOutlineLoading3Quarters className='rotate loading'/>
            </div>
            
            
            {storiesMostView.data && storiesRecent.data && storiesRandom && 
            <>
            <SlideSection data={exportSlideStory(storiesMostView.data, storiesRecent.data, storiesRandom)}/>
            <DefaultSection name={STORY_RECENT} data={storiesRecent.data} path={"/recent"}/>
            <DefaultSection name={STORY_MOSTVIEW} data={storiesMostView.data} path={"/mostview"}/>
            </>
            }

            {/* <DefaultSection name={STORY_RANDOM} data={storiesRandom} querry={false}/> */}
        </div>
    )
}
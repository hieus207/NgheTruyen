import styles from './home.module.scss'
import clsx from 'clsx'
import CategorySection from "./CategorySection"
import SlideSection from "./SlideSection"
export default function Home(){
    return(
        <div className={clsx(styles.container)}>
            <h1>Main page</h1>
            <CategorySection/>
            <SlideSection/>
        </div>
        
    )
}
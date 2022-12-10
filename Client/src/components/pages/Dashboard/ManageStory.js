import clsx from 'clsx'
import styles from "./dashboard.module.scss"
import fakeStories from "../../../mocks/story.json"
import StoryItem from './StoryItem'
import Link from '../../helpers/Link'
export default function ManageStory(){

    return(
        <div className={clsx("container",styles.wrapper)}>
            Manage
            <Link to={'/dashboard/story/create'}> Thêm truyện</Link>
            <div className={clsx(styles.listWrapper)}>
                <div className={clsx(styles.listStory)}>
                    {fakeStories.map(story => <StoryItem data={story}/>)}
                </div>
            </div>

        </div>
    )
}
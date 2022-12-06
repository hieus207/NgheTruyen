import clsx from 'clsx'
import styles from "./dashboard.module.scss"
import fakeStories from "../../../mocks/story.json"
import StoryItem from './StoryItem'
export default function ManageStory(){

    return(
        <div className={clsx("container",styles.wrapper)}>
            Manage
            <button>Thêm truyện</button>
            <div className={clsx(styles.listWrapper)}>
                <div className={clsx(styles.listStory)}>
                    {fakeStories.map(story => <StoryItem data={story}/>)}
                </div>
            </div>

        </div>
    )
}
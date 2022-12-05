import clsx from 'clsx'
import DefaultSection from '../../helpers/DefaultSection'
import fakeStories from "../../../mocks/story.json"

export default function Search(){
    return(
        <div className={clsx("container")}>
            <DefaultSection name={"Search"} data={fakeStories} querry={false}/>
        </div>
    )
}
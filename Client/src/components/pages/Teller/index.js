import clsx from 'clsx'
import DefaultSection from '../../helpers/DefaultSection'
import fakeStories from "../../../mocks/story.json"

export default function Teller(){
    return(
        <div className={clsx("container")}>
            <DefaultSection name={"Teller"} data={fakeStories} querry={false}/>
        </div>
    )
}
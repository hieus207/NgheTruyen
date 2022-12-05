import clsx from 'clsx'
import { TiVolumeUp } from "react-icons/ti";
import StoryList from "../StoryList";

export default function DefaultSection({name, data, querry = true}){
    return(
        <div className={clsx("section")}>
            <div className={clsx("section_name")}>
                <div className={clsx("section_name_left")}>{name}&nbsp;<TiVolumeUp size={"1.2em"}/></div>
                {querry&&<div>Xem Thêm</div>}
            </div>
            <div className={clsx("section_content")}>
                <StoryList data={data}/>
            </div>
        </div>
    )
}
import clsx from 'clsx'
import { TiVolumeUp } from "react-icons/ti";
import PaginationBar from '../PaginationBar';
import StoryList from "../StoryList";

export default function DefaultSection({name, data, querry = true, currentPage = null, lastestPage = null}){


    return(
        <div className={clsx("section")}>
            <div className={clsx("section_name")}>
                <div className={clsx("section_name_left")}>{name}&nbsp;<TiVolumeUp size={"1.2em"}/></div>
                {querry&&<div>Xem Thêm</div>}
            </div>
            <div className={clsx("section_content")}>
                <StoryList data={data}/>
            </div>
            {lastestPage && <PaginationBar currentPage={currentPage} lastestPage={lastestPage}/>}
        </div>
    )
}
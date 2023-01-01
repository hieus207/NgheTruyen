import clsx from 'clsx'
import { TiVolumeUp } from "react-icons/ti";
import Link from '../Link';
import PaginationBar from '../PaginationBar';
import StoryList from "../StoryList";

export default function DefaultSection({name, data, querry = true, currentPage = null, lastestPage = null, path = null}){

    return(
        <div className={clsx("section","p-10")}>
            <div className={clsx("section_name")}>
                <div className={clsx("section_name_left")}>{name}&nbsp;<TiVolumeUp size={"1.2em"}/></div>
                {querry&&<Link to={path}>Xem thêm</Link>}
            </div>
            <div className={clsx("section_content")}>
                <StoryList data={data}/>
            </div>
            { lastestPage>0 && <PaginationBar currentPage={currentPage} lastestPage={lastestPage}/>}
        </div>
    )
}
import clsx from 'clsx'
import { TiVolumeUp } from "react-icons/ti";
import { NO_RESULT, VIEW_MORE } from '../../../constants';
import Link from '../Link';
import PaginationBar from '../PaginationBar';
import StoryList from "../StoryList";
import styles from "./defaultSection.module.scss"
export default function DefaultSection({name, data, querry = true, currentPage = null, lastestPage = null, path = null, fullHeight = false}){
  
    return(
        <div className={clsx("section","p-10","mh-i",{[styles.fullHeight]: fullHeight})}>
            <div className={clsx("section_name")}>
                <div className={clsx("section_name_left")}>{name}&nbsp;<TiVolumeUp size={"1.2em"}/></div>
                {querry&&<Link to={path}>{VIEW_MORE}</Link>}
            </div>
            
            <div className={clsx("section_content mh-i",{[styles.contenFullHeight]:fullHeight})}>
                <StoryList data={data}/>
                <div className='absolute-middle'>{data && data.length===0 && NO_RESULT}</div>
            </div>
            { lastestPage>0 && <PaginationBar currentPage={currentPage} lastestPage={lastestPage}/>}
        </div>
    )
}
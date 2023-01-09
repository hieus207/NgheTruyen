import clsx from "clsx"
import styles from "./paginationBar.module.scss"
import { Link, useLocation } from "react-router-dom"
const PaginationBar = ({currentPage, lastestPage}) => {
    const location = useLocation()
    currentPage = parseInt(currentPage)
    lastestPage = parseInt(lastestPage)

    function generLink(pageNumber){
        let params = location.search
        const pagePosition = params.indexOf("page")
        if(pagePosition !== -1){
            const endPagePosition = params.indexOf("&",pagePosition+1)//-1 //!=-1
            if(endPagePosition !== -1){
                params = (params.slice(0, pagePosition)+"page="+pageNumber+params.slice(endPagePosition))
            }
            else{
                params = params.slice(0, pagePosition)+"page="+pageNumber
            }
        }
        else{
            if(params){
                params += "&page="+pageNumber
            }
            else{
                params += "?page="+pageNumber
            }
        }
        return location.pathname+params
    }

    return(
    <>
    <div className="d-flex j-center" style={{height:"50px",position:"relative"}}>
    <div className={clsx("d-flex j-center",styles.wrapper)}>
        {currentPage-1> 1 && <Link className={clsx(styles.linkPage,'link')} to={generLink(1)}>1</Link>}
        {currentPage-1> 2 && <Link className={clsx(styles.linkPage,'link')} to={generLink(2)}>2</Link>}
        {currentPage > 4 && <Link className={clsx(styles.linkPage,'link')}>...</Link>}
        {currentPage-1> 0 && <Link className={clsx(styles.linkPage,'link')} to={generLink(currentPage-1)}>{currentPage-1}</Link>}
        <Link className={clsx(styles.active,"link")}>{currentPage}</Link>
        {lastestPage>currentPage+1 && <Link className={clsx(styles.linkPage,'link')} to={generLink(currentPage+1)}>{currentPage+1}</Link>}
        {lastestPage > currentPage+2 && <Link className={clsx(styles.linkPage,'link')}>...</Link>}
        {lastestPage>currentPage && <Link className={clsx(styles.linkPage,'link')} to={generLink(lastestPage)}>{lastestPage}</Link>}
  
    </div>
    </div>
 


    </>
   
       
    )
}

export default PaginationBar
import clsx from "clsx"
import styles from "./navbar.module.scss"
import Link from "../helpers/Link"
import { AUTHOR, CATEGORY, HEADER_HOME, TELLER } from "../../constants"
import Image from "../helpers/Image"
import {AiFillHome,AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai"
import {BiCategory} from "react-icons/bi"
import {BsFillBrushFill,BsMicFill} from "react-icons/bs"
import { useLocation } from "react-router-dom"
import { useState } from "react"


export default function Navbar(){
    const pathname = useLocation().pathname;
    const [collapse,setCollapse] = useState(window.innerWidth<750)

    return(
        <header className={clsx(styles.wrapper,{[styles.collapseWrapper]:collapse})}>
            <div className={clsx(styles.nav,{[styles.collapseNav]:collapse})}>
                <div className={clsx(styles.left_navbar)}>
                    <Link to="/"><Image src={require("../../assets/images/logo.png")} alt="logo" logo logoSmall={collapse}/></Link>
                </div>
                <div className={clsx(styles.navBody)}>
                    <Link to="/">
                        <div className={clsx(styles.navItem,{
                            [styles.navItemActive]: pathname==="/",
                            [styles.navItemCollapse] : collapse
                            })}>
                            <AiFillHome className="v-m"/><span className="v-m" hidden={collapse}> {HEADER_HOME}</span>
                        </div>
                    </Link>
                    <Link to="/category">
                        <div className={clsx(styles.navItem,{
                            [styles.navItemActive]: pathname.startsWith("/category"),
                            [styles.navItemCollapse] : collapse
                            })}>
                            <BiCategory className="v-m"/><span className="v-m" hidden={collapse}> {CATEGORY}</span>
                        </div>
                    </Link>
                    <Link to="/author">
                        <div className={clsx(styles.navItem,{
                            [styles.navItemActive]: pathname.startsWith("/author"),
                            [styles.navItemCollapse] : collapse
                            })}>
                            <BsFillBrushFill className="v-m"/><span className="v-m" hidden={collapse}> {AUTHOR}</span>
                        </div>
                    </Link>
                    <Link to="/teller">
                        <div className={clsx(styles.navItem,{
                            [styles.navItemActive]: pathname.startsWith("/teller"),
                            [styles.navItemCollapse] : collapse
                            })}>
                            <BsMicFill className="v-m"/><span className="v-m" hidden={collapse}> {TELLER}</span>
                        </div>
                    </Link>
                </div>
                {
                    !collapse?
                    <div className={clsx(styles.collapseLeft)} onClick={()=>setCollapse(!collapse)}>
                        <AiFillCaretLeft/>
                    </div>
                    :
                    <div className={clsx(styles.collapseRight)} onClick={()=>setCollapse(!collapse)}>
                        <AiFillCaretRight/>
                    </div>
                }


            </div>
        </header>
    )
}
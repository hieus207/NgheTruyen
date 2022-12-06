// import {Link } from "react-router-dom"
import styles from "./header.module.scss"
import useModal from "../../hooks/useModal";
import Modal from "../helpers/Modal";
import clsx from "clsx"
import Link from "../helpers/Link";
import Button from "../helpers/Button";
import LoginForm from "../helpers/LoginForm";

export default function Header(){
    const {isShowing, toggle} = useModal();

    return(
        <header>
            <nav className={clsx(styles.navbar)}>
                <div className={clsx(styles.left_navbar)}>Logo</div>
                <div className={clsx(styles.main_navbar)}>
                    <Link to="/">Home</Link>
                    <Link to="/search">Search</Link>
                    <Link to="/teller">Teller</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </div>
                <div className={clsx(styles.right_navbar)}>
                    <Button onClick={toggle}>Login</Button>
                </div>
            </nav>
            <Modal isShowing={isShowing} hide={toggle}>
                <LoginForm/>
            </Modal>
        </header>

    )
}
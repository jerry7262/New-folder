import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import styles from "./Navbar.module.css"
const Navbar = ({toggleDarkMode , darkMode}) => {
    const navigate =useNavigate()
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>FaithConnect</div>
            <ul className={styles.navLinks}>
                <button onClick={toggleDarkMode}>{darkMode?"☀️":"🌙"}</button>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/history">History</Link>
                </li>
                <li>
                    <Link to="/services">services</Link>
                </li>
                <li>
                    <Link to="/bible">Bible</Link>
                </li>
                <li>
                    <Link to="/prayer">Prayer</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li >
                    <Link to="/glossary">glossary</Link>
                </li>
            </ul>
        </nav>
    )   
}

export default Navbar

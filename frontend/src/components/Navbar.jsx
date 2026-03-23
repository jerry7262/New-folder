import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Search } from 'lucide-react'; // Import the icon
import styles from "./Navbar.module.css";
import SearchModal from './SearchModal';
import { useAuth } from "../contexts/AuthContext";

const Navbar = ({ toggleDarkMode, darkMode }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { logout, isLoggedIn } = useAuth();

    return (
        <nav className={styles.navbar}>
            {/* Modal is controlled by state now */}
            <SearchModal 
                isOpen={isSearchOpen} 
                onClose={() => setIsSearchOpen(false)} 
            />

            <div className={styles.logo}>✝ FaithConnect</div>

            <ul className={styles.navLinks}>
                {/* Search Trigger Button */}
                <button 
                    className={styles.iconBtn} 
                    onClick={() => setIsSearchOpen(true)}
                    aria-label="Search"
                >
                    <Search size={20} />
                </button>

                <button className={styles.iconBtn} onClick={toggleDarkMode}>
                    {darkMode ? "☀️" : "🌙"}
                </button>

                <li><Link to="/">Home</Link></li>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/bible">Bible</Link></li>
                <li><Link to="/prayer">Prayer</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/glossary">Glossary</Link></li>
                <li><Link to="/verse">Daily Devotional</Link></li>
                <li><Link to="/bookmarks">Saved</Link></li>

                {!isLoggedIn ? (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign up</Link></li>
                    </>
                ) : (
                    <>
                        <button
                            type="button"
                            onClick={() => logout()}
                            aria-label="Logout"
                            title="Logout"
                        >
                            ⎋
                        </button>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
import React from 'react'
import style from "./Hero.module.css"
import {Link} from "react-router-dom"
const Hero = () => {
    return (
        <section className={style.hero}>
            <div className={style.heroContent}>
                <h1>Explore Christianity</h1>
                <p>Discover Christian history, teachings, Bible stories and
                    daily inspiration.
                </p>
                <Link to="/history">
                    <button className={style.heroBtn}>Explore History</button>
                </Link>
            </div>
        </section>
    )
}

export default Hero

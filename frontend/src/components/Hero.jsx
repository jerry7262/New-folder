import React from 'react'
import style from "./Hero.module.css"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"

const _motion = motion;
const Hero = () => {
    const { scrollY } = useScroll()
    const parallaxY = useTransform(scrollY, [0, 600], [0, -35])
    return (
        <motion.section className={style.hero} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <motion.div
                className={style.heroContent}
                style={{ y: parallaxY }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <h1>Explore Christianity</h1>
                <p>Discover Christian history, teachings, Bible stories and
                    daily inspiration.
                </p>
                <Link to="/history">
                    <motion.button
                        className={style.heroBtn}
                        whileHover={{ y: -3, scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Explore History
                    </motion.button>
                </Link>
            </motion.div>
        </motion.section>
    )
}

export default Hero

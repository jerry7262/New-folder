import ServiceCard from '../components/ServiceCard'
import Hero from "../components/Hero"
import styles from './home.module.css'
import VerseCard from '../components/VerseCard'
import HistoryPreview from '../components/HistoryPreview'
import { useNavigate } from 'react-router-dom'
import { articles } from "../data/articles"
import { services } from "../data/services"
import { useState } from 'react'
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [visileCount, setVisibleCount] = useState(2)
  const categories = ["All", ...new Set(articles.map(a => a.category))]
  const navigate = useNavigate()

  const filteredArticles = selectedCategory === "All" ? articles : articles.filter(article => article.category === selectedCategory)
  return (
    <div>
      <Hero />
      <div className={styles.categoryButtons}>
        {categories.map((cat) => (<button key={cat} 
        className={selectedCategory === cat ? styles.activeBtn : ""} 
        onClick={() => {
          setSelectedCategory(cat)
          setVisibleCount(2)
          }}>
          {cat}
        </button>))}
      </div>

      <section className={styles.articles}>
        <h2>Featured Articles</h2>

        <div className={styles.articleGrid}>
          {filteredArticles.slice(0,visileCount)
            .map((article) => (
              <div
                key={article.id}
                className={styles.articleCard}
                onClick={() => navigate(`/article/${article.id}`)}>
                <img src={article.image} alt={article.title} />
                <h3>{article.title}</h3>
                <p>{article.content.slice(0, 60)}...</p>
              </div>
            ))}
        </div>
        {visileCount<filteredArticles.length && (
          <button className={styles.loadMore} onClick={()=>setVisibleCount(visileCount+1)}>
            Load more
            </button>
        )}
      </section>

      <section className={styles.services}>
        <h2 className={styles.servicesTitle}>Our Services</h2>
        <div className={styles.serviceGrid}>
          {services.map((service) => (
            <div key={service.title} onClick={() => navigate(service.path)}>
              <ServiceCard
                title={service.title}
                description={service.description}
                button={service.button}
              />
            </div>
          ))}
        </div>
      </section>
      <VerseCard />
      <HistoryPreview />
    </div>
  )
}

export default Home

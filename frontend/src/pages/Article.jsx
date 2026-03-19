import { useNavigate, useParams } from "react-router-dom"
import styles from "./Article.module.css"
import { articles } from "../data/articles"

const Article = () => {

    const { id } = useParams()

    const article = articles.find(a => a.id.toString() === id)

    if (!article) return <h2>Article not found</h2>

    const navigate = useNavigate()
   return (
  <div className={styles.container}>

    {/* HERO IMAGE */}
    <div className={styles.hero}>
      <img src={article.image} alt={article.title} />
      <h1>{article.title}</h1>
    </div>

    {/* CONTENT */}
    <div className={styles.content}>
      <p>{article.content}</p>

      <p>
        Christianity teaches values of love, forgiveness, and hope. These teachings 
        help individuals grow spiritually and build strong moral foundations.
      </p>

      <p>
        By following these principles, believers find peace and purpose in life, 
        even during challenging times.
      </p>
    </div>

    {/* RELATED ARTICLES */}
    <div className={styles.related}>
      <h2>Related Articles</h2>

      <div className={styles.relatedGrid}>
        {articles
          .filter(a => a.id !== article.id)
          .slice(0, 2)
          .map((a) => (
            <div 
              key={a.id}
              className={styles.card}
              onClick={() => navigate(`/article/${a.id}`)}
            >
              <img src={a.image} alt={a.title} />
              <h4>{a.title}</h4>
            </div>
          ))}
      </div>
    </div>

    {/* BACK BUTTON */}
    <button 
      className={styles.backBtn}
      onClick={() => navigate("/")}>
      ← Back to Home
    </button>

  </div>
)
}

export default Article
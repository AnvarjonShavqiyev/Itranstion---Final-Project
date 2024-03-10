import { useEffect, useState } from "react"
import instance from "../../api/axios"
import Nav from "../../components/nav/Nav"
import { Container } from "../../utils/Utils"
import './Home.scss'
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'
const Home:React.FC = () => {
  const [items,setItems] = useState([])
  const {t} = useTranslation()
  useEffect(() => {
    instance.get('/item')
    .then(response => setItems(response.data))
    .catch(error => console.log(error))
  },[])
  return (
    items && <>
      <Nav/>
      <Container>
        <div className="tag-cloud-wrapper">
          <div className="tag-header">
            <p>{t('search-tags')}</p>
          </div>
          <div className="tags-wrapper">
              {
               items.tags && items.tags.map((tag: string, index: number) => {
                return <Link className="tagName" to={`/search/${tag}`} key={index}>#{tag}</Link>
              })
              }
          </div>
          <div className="largest-collections-wrapper">
            <h3 className="collection-title">{t('collection-title')}</h3>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home
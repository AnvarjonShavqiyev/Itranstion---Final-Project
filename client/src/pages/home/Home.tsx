import { useEffect, useState } from "react"
import instance from "../../api/axios"
import Nav from "../../components/nav/Nav"
import { Container } from "../../utils/Utils"
import './Home.scss'
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import { getCollections } from "../../redux/features/collectionSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { Items,Collection } from '../../types/ElementTypes'
const Home:React.FC = () => {
  const [items, setItems] = useState<Items>({ tags: [], result: [] });
  const {t} = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const collections: Collection[] = useSelector((state: RootState) => state.collections.collections);  
  useEffect(() => {
    instance.get('/item')
    .then(response => setItems(response.data))
    .catch(error => console.log(error))
  },[])
  useEffect(()=>{
    dispatch(getCollections())
  },[dispatch])
  console.log(collections)
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
          <h3 className="collection-title">{t('collection-title')}</h3>
          <div className="largest-collections-wrapper">
              {
                collections && collections.map((collection:Collection) => {
                  return <div className="collection-wrapper" key={collection._id}>
                      <img width={400} src={collection.image} alt="" />
                      <div className="collection-info">
                        <p>{collection.name}</p>
                        <p>{collection.items.length} items</p>
                      </div>
                  </div>
                })
              }
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home
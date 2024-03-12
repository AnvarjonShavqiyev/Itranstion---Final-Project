import { useEffect } from "react"
import Nav from "../../components/nav/Nav"
import { Container } from "../../utils/Utils"
import './Home.scss'
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import { getCollections } from "../../redux/features/collectionSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { Collection, Item, Items } from '../../types/ElementTypes'
import { getItems } from "../../redux/features/itemSlice"
import Footer from "../../components/footer/Footer"
const Home:React.FC = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const collections = useSelector((state: RootState) => state.collections.collections) as Collection[];  
  const items = useSelector((state: RootState) => state.items.items) as Items;   
  useEffect(()=>{
    dispatch(getCollections())
    dispatch(getItems())
  },[dispatch])
  console.log(items)
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
                collections && collections.slice(0,5).map((collection:Collection) => {
                  return <div className="collection-wrapper" key={collection._id}>
                      <img width={400} src={collection.image} alt="" />
                      <div className="collection-info">
                        <p>{collection.name}</p>
                        <p>{collection.items.length}{collection.items.length > 1 ? ' ' + t('items') : ' ' + t('item')}</p>
                      </div>
                  </div>
                })
              }
          </div>
          <h3 className="collection-title">{t('item-title')}</h3>
          <div className="latest-items-wrapper">
              {
                items.result.slice(0,5).map((item:Item) => {
                  return <div className="collection-wrapper" key={item._id}>
                  <img width={400} src={item.image} alt="" />
                  <div className="collection-info">
                    <p>{item.name}</p>
                    <p>{item.comments.length} {item.comments.length > 1 ? ' ' + t('comments') : ' ' + t('comment')}</p>
                  </div>
                  <p>0{item.like} {item.like > 1 ? ' ' + t('likes') : ' ' + t('like')}</p>
              </div>
                })
              }
          </div>
        </div>
      </Container>
      <Footer/>
    </>
  )
}

export default Home
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
import CollectionC from "../../components/collection/Collection"
import ItemC from "../../components/item/Item"
const Home:React.FC = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const collections = useSelector((state: RootState) => state.collections.collections) as Collection[];  
  const items = useSelector((state: RootState) => state.items.items) as Items;   
  const searchResult = useSelector((state: RootState) => state.search.result)
  console.log(searchResult)
  useEffect(()=>{
    dispatch(getCollections())
    dispatch(getItems())
  },[dispatch])
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
          <div className="section-title">
            <h3 className="collection-title">{t('collection-title')}</h3>
            <Link to='/'>See all collections</Link>
          </div>
          <div className="largest-collections-wrapper">
              {
                collections && collections.slice(0,5).map((collection:Collection) => {
                  return <CollectionC key={collection._id} collection={collection}/>
                })
              }
          </div>
          <div className="section-title">
            <h3 className="collection-title">{t('item-title')}</h3>
            <Link to='/'>See all items</Link>
          </div>
          <div className="latest-items-wrapper">
              {
                (items.result.slice(0, 5) as Item[]).map((item: Item): JSX.Element => {
                  return <ItemC key={item._id} item={item}/>
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

  import { useParams } from 'react-router-dom'
  import { Container } from '../../utils/Utils'
  import './SingleCol.scss'
  import { useEffect } from 'react'
  import { useDispatch, useSelector } from 'react-redux'
  import { AppDispatch, RootState } from '../../redux/store'
  import { getSingleCollection } from '../../redux/features/collectionSlice'
  import { Collection } from '../../types/ElementTypes'
  import ItemC from '../../components/item/Item'
  const SingleCol = () => {
    const {id} = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const collection = useSelector((state:RootState) => state.collections.collection) as Collection
    useEffect(() => {
    id && dispatch(getSingleCollection(id))
    },[id])
    console.log(collection)
    return (
      <Container>
          <div className='single-col-wrapper'>
              <img src={collection.image} alt="" />
              <div className='single-col-info'>
                  <p>Name: {collection.name}</p>
                  <p>Topic: {collection.topic}</p>
                  <p>Description:<br/>{collection.discreption}</p>
                  <p>Items count: {collection.items.length}</p>
              </div>
          </div>
          <div className='single-col-items'>
            {
              collection.items.map((item:any) => {
                return <ItemC key={item._id} item={item}/>
              })
            }
          </div>
      </Container>
    )
}
export default SingleCol
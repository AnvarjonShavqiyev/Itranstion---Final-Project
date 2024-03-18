import { useParams } from 'react-router-dom'
import { Container } from '../../utils/Utils'
import './SingleCol.scss'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { getSingleCollection } from '../../redux/features/collectionSlice'
const SingleCol = () => {
  const {id} = useParams()
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
   id && dispatch(getSingleCollection(id))
  },[id])
  return (
    <Container>
        <div className='single-col-wrapper'>
            
        </div>
    </Container>
  )
}

export default SingleCol
import { Container } from '@mui/material'
import './SingleItem.scss'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getSingleItem } from '../../redux/features/itemSlice'
const SingleItem = () => {
  const { id } = useParams()
  useEffect(() => {
    getSingleItem(id)
  },[])
  return (
    <Container>
        <div className='single-item-wrapper'>

        </div>
    </Container>
  )
}

export default SingleItem
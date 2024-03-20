import { Container } from '@mui/material'
import './SingleItem.scss'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getSingleItem } from '../../redux/features/itemSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { Item } from '../../types/ElementTypes'
import Avatar from '@mui/joy/Avatar';
const SingleItem = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const item = useSelector((state:RootState) => state.items.item) as Item
  useEffect(() => {
    dispatch(getSingleItem(id))
  },[])
  console.log(item)
  return (
    item && <Container>
        <div className='single-item-wrapper'>
          <img src={item.image} alt="" />
          <div className='single-item-info'>
              <p>Name: {item.name}</p>
              <div className='single-item-tags'>
                <p>Tags:</p>
                {
                  item.tags.split("#").slice(1,item.tags.split('#').length).map((tag:string) => {
                    return <Link className='tagName' to={`/search/${tag}`}>#{tag}</Link>
                  })
                }
              </div>
              <p>{item.like} {item.like > 1 ? "likes" : "like"}</p>
              <div className='single-item-add-info'>
                {
                  item.additionalInfo.length > 0 && 
                  item.additionalInfo.map(el => {
                    const keys = Object.keys(el); 
                    const values = Object.values(el); 
                    return <p>{keys[0]}:{values[0]}</p>
                  })                  
                }
              </div>
          </div>
        </div>
        <div className='single-item-comments'>
            <div className='comments-header'>
              <p>Comments</p>
              <p>{item.comments.length} {item.comments.length > 1 ? "comments" : "comment"}</p>
            </div>
            <div className='comments-wrapper'>
              {
                item.comments.length > 0 ? item.comments.map(comment => {
                  return <div className='comment'>
                    <div className='user-info'>
                      <Avatar>{comment.name[0]}</Avatar>
                      <strong className='user-name'>{comment.name}</strong>
                    </div>
                    <p className='user-comment'>{comment.text}</p>
                  </div> 
                }) : <p>No Comments</p>
              }
            </div>
          </div>
    </Container>
  )
}

export default SingleItem
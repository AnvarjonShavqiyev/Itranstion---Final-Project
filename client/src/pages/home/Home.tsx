import { useEffect, useState } from "react"
import instance from "../../api/axios"
import Nav from "../../components/nav/Nav"
import { Container } from "../../utils/Utils"
import './Home.scss'
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Home:React.FC = () => {
  const [items,setItems] = useState([])
  const state = useSelector(state => state)
  console.log(state)
  useEffect(() => {
    instance.get('/item')
    .then(response => setItems(response.data))
    .catch(error => console.log(error))
  },[])
  console.log(items)
  return (
    items && <>
      <Nav/>
      <Container>
        <div className="tag-cloud-wrapper">
          <div className="tag-header">
            <h3>Search with</h3>
            <p>#tags</p>
          </div>
          <div className="tags-wrapper">
              {
                items.tags && items.tags.map((tag:string, index: number) => {
                   return <Link className="tagName" to='/search' key={index}>#{tag}</Link>
                })
              }
          </div>
          <div className="largest-collections-wrapper">
              
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home
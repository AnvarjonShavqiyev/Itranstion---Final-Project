import Nav from "../../components/nav/Nav"
import { Container } from "../../utils/Utils"
import './Home.scss'
const Home:React.FC = () => {
  return (
    <>
      <Nav/>
      <Container>
        <div className="tag-cloud-wrapper">
          <div className="tag-header">
            <h3>Search with</h3>
            <p>#tags</p>
          </div>
          <div className="tags-wrapper">
            
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home
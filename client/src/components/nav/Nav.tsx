import { Container } from '../../utils/Utils'
import { CiSearch } from "react-icons/ci";
import './Nav.scss'
import { Link } from 'react-router-dom';
const Nav = () => {
  return (
    <Container>
        <div className='navbar-wrapper'>
            <h1 className='nav-title'>CollectIT</h1>
              <div className='nav-search-wrapper'>
                  <input type="text" placeholder='Search anything...'/>
                  <CiSearch className='search-icon'/>
              </div>
              <div className='nav-reg-wrapper'>
                  <Link to='/signIn'>Login</Link>
              </div>
        </div>
    </Container>
  )
}

export default Nav
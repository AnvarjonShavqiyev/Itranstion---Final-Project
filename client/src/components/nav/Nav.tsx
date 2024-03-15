import { Container } from '../../utils/Utils'
import { CiSearch } from "react-icons/ci";
import './Nav.scss'
import { Link } from 'react-router-dom';
import LangSwitcher from '../langSwitcher/LangSwitcher';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { searchByKey } from '../../redux/features/searchSlice';
const Nav = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const [search, setSearch] = useState<string>('')
  useEffect(() => {  
    dispatch(searchByKey(search))
  },[search])
  return (
    <Container>
        <div className='navbar-wrapper'>
            <h1 className='nav-title'>CollectIT</h1>
              <div className='nav-search-wrapper'>
                  <input type="text" placeholder={t('nav-search-ps')} onChange={(e) => setSearch(e.target.value)}/>
                  <CiSearch className='search-icon'/>
              </div>
              <div className='nav-reg-wrapper'>
                  <LangSwitcher/>
                  <Link to='/signIn'>{t('nav-login')}</Link>
              </div>
        </div>
    </Container>
  )
}

export default Nav
import LangSwitcher from "../langSwitcher/LangSwitcher"
import { Link } from "react-router-dom"
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { logOut } from "../../redux/features/authSlice";
import './AdminNav.scss'
const AdminNav = () => {
    const dispatch = useDispatch<AppDispatch>()
    return (
    <div>
        <div className="admin-nav-wrapper">
            <h2>Dashboard</h2>
            <div>
                <LangSwitcher/>
                <Dropdown>
                    <MenuButton className="dashboard-title"><Avatar src="/broken-image.jpg" /></MenuButton>
                    <Menu>
                      <MenuItem><Link to='/'>Home</Link></MenuItem>
                      <MenuItem onClick={() => dispatch(logOut())}>Logout</MenuItem>
                    </Menu>
                </Dropdown>
            </div>
        </div>
    </div>
  )
}

export default AdminNav
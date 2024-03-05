import { Route, Routes } from "react-router-dom"
import Auth from "../pages/auth/Auth"
import React from "react"
import Home from "../pages/home/Home"

const index:React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:authName" element={<Auth />} />
        {/* <Route path="/home" element={<Home/>}/> */}
    </Routes>
  )
}

export default index
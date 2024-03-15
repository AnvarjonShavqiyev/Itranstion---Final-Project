import { Route, Routes } from "react-router-dom"
import Auth from "../pages/auth/Auth"
import React from "react"
import Home from "../pages/home/Home"
import SearchRpage from "../pages/searchRpage/SearchRpage"

const index:React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:authName" element={<Auth />} />
        <Route path="/search/:tag" element={<SearchRpage />} />
    </Routes>
  )
}

export default index
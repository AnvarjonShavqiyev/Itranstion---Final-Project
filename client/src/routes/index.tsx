import { Route, Routes } from "react-router-dom"
import Auth from "../pages/auth/Auth"
import React, { useState } from "react"
import Home from "../pages/home/Home"
import SearchRpage from "../pages/searchRpage/SearchRpage"

const index:React.FC = () => {
  const [search, setSearch] = useState<string>('')
  return (
    <Routes>
        <Route path="/" element={<Home setSearch={setSearch} search={search}/>} />
        <Route path="/:authName" element={<Auth />} />
        <Route path="/search/:tag" element={<SearchRpage search={search} setSearch={setSearch}/>} />
    </Routes>
  )
}

export default index
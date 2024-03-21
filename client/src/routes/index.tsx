import { Route, Routes } from "react-router-dom"
import Auth from "../pages/auth/Auth"
import React, { useState } from "react"
import Home from "../pages/home/Home"
import SearchRpage from "../pages/searchRpage/SearchRpage"
import SingleCol from "../pages/singleCol/SingleCol"
import SingleItem from "../pages/singleItem/SingleItem"
import Private from "./private/Private"
import Dashboard from "../pages/dashboard/Dashboard"

const index:React.FC = () => {
  const [search, setSearch] = useState<string>('')
  return (
    <Routes>
      <Route path="/" element={<Home setSearch={setSearch} search={search}/>} />
      <Route path="/:authName" element={<Auth />} />
      <Route path="/search/:tag" element={<SearchRpage search={search} setSearch={setSearch}/>} />
      <Route path="/singleCol/:id" element={<SingleCol/>}/>
      <Route path="/singleItem/:id" element={<SingleItem/>}/>
      <Route path="/dashboard" element={<Private/>}>
        <Route index element={<Dashboard/>}/>
      </Route>
    </Routes>
  )
}

export default index  
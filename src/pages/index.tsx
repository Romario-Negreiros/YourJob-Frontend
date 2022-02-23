import React from 'react'

import { Routes, Route } from 'react-router-dom'
import Layout from '../layouts'
import Home from './Home'
import NoMatch from './NoMatch'
import Vagancies from './Vagancies'
import Login from './Login'
import Companies from './Companies'
import { UserRegister, CompanyRegister } from './Register'
import { UserProfile, CompanyProfile } from './Profile'

const Pages: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="vagancies" element={<Vagancies />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<UserRegister />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="companies">
          <Route index element={<Companies />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<CompanyRegister />} />
          <Route path="profile" element={<CompanyProfile />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default Pages

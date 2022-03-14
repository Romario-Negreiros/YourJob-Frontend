import React from 'react'

import { Routes, Route } from 'react-router-dom'
import Layout from '../layouts'
import Home from './Home'
import NoMatch from './NoMatch'
import Vagancies from './Vagancies'
import Login from './Login'
import CompaniesHomePage from './CompaniesHomePage'
import { UserRegister, CompanyRegister } from './Register'
import { UserProfile, CompanyProfile } from './Profile'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import LastStepMessage from './LastStepMessage'
import VerifyEmail from './VerifyEmail'
import Companies from './Companies'
import Users from './Users'

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
        <Route path="forgot_password" element={<ForgotPassword />} />
        <Route path="reset_password/:token/:mode" element={<ResetPassword />} />
        <Route path="last_step/:name" element={<LastStepMessage />} />
        <Route path="verify_email/:id/:token/:mode" element={<VerifyEmail />} />
        <Route path="users" element={<Users />} />
        <Route path="companies">
          <Route index element={<CompaniesHomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<CompanyRegister />} />
          <Route path="profile" element={<CompanyProfile />} />
          <Route path="list" element={<Companies />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default Pages

import React from 'react'

import { Routes, Route } from 'react-router-dom'
import Layout from '../layouts'
import Home from './Home'
import NoMatch from './NoMatch'
import Vagancies from './Vagancies'

const Pages: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="vagancies" element={<Vagancies />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}

export default Pages

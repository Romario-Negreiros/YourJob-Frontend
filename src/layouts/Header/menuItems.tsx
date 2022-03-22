import React from 'react'
import { MenuItem } from './interfaces'

import BusinessIcon from '@mui/icons-material/Business'
import HomeIcon from '@mui/icons-material/Home'

const menuItems: MenuItem[] = [
  {
    url: '/',
    ariaLabel: 'Go to home page',
    text: 'Home',
    icon: <HomeIcon />
  },
  {
    url: '/companies',
    ariaLabel: 'Go to companies home page',
    text: 'For companies',
    icon: <BusinessIcon />
  }
]

export default menuItems

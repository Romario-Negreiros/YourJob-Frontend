import React from 'react'
import { MenuItem } from './interfaces'

import AccountIcon from '@mui/icons-material/AccountBox'
import BusinessIcon from '@mui/icons-material/Business'
import HomeIcon from '@mui/icons-material/Home'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import GroupIcon from '@mui/icons-material/Group'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
// import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

const menuItems: MenuItem[] = [
  {
    url: '/',
    ariaLabel: 'Go to home page',
    text: 'Home',
    icon: <HomeIcon />
  },
  {
    url: '/users',
    ariaLabel: 'Go to users list page',
    text: 'Users list',
    icon: <GroupIcon />
  },
  {
    url: '/companies/list',
    ariaLabel: 'Go to companies list page',
    text: 'Companies list',
    icon: <HomeWorkIcon />
  },
  {
    url: '/companies',
    ariaLabel: 'Go to companies home page',
    text: 'For companies',
    icon: <BusinessIcon />
  },
  {
    url: '/profile',
    ariaLabel: 'Go to profile page',
    text: 'Profile',
    icon: <AccountIcon />
  },
  {
    url: '/login',
    ariaLabel: 'Go to log in page',
    text: 'Log in',
    icon: <LoginRoundedIcon />
  }
]

export default menuItems

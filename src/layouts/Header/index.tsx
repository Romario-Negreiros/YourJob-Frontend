import React from 'react'

import { Link, useNavigate, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import AccountIcon from '@mui/icons-material/AccountBox'
import BusinessIcon from '@mui/icons-material/Business'
import HomeIcon from '@mui/icons-material/Home'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
// import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>()
  const isMenuOpen = Boolean(menuAnchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (window.innerWidth <= 600) setMenuAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => setMenuAnchorEl(null)

  const handleRedirect = (path: string) => {
    const { pathname } = location
    if (pathname.includes('/companies')) {
      navigate(`/companies/${path}`)
    } else {
      navigate(`/${path}`)
    }
  }

  return (
    <AppBar
      position="relative"
      sx={{ zIndex: theme => theme.zIndex.drawer + 1, bgcolor: 'primary.dark' }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          YourJob
        </Typography>
        <Box sx={{ display: { xs: 'initial', sm: 'none' } }}>
          <IconButton
            aria-controls={isMenuOpen ? 'mobile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuOpen ? 'true' : undefined}
            onClick={handleClick}
            id="menu-icon"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Link to="/" aria-label="Go to home page">
            <IconButton size="large" edge="end">
              <HomeIcon />
            </IconButton>
          </Link>
          <Link to="/companies" aria-label="Go to companies page">
            <IconButton size="large" edge="end">
              <BusinessIcon />
            </IconButton>
          </Link>
          <Link to="/profile" aria-label="Go to profile page" onClick={() => handleRedirect('profile')}>
            <IconButton size="large" edge="end">
              <AccountIcon />
            </IconButton>
          </Link>
          <IconButton
            size="large"
            edge="end"
            aria-label="Go to login page"
            onClick={() => handleRedirect('login')}
          >
            <LoginRoundedIcon />
          </IconButton>
        </Box>
        <Menu
          id="mobile-menu"
          anchorEl={menuAnchorEl}
          open={isMenuOpen}
          onClose={handleCloseMenu}
          MenuListProps={{
            'aria-labelledby': 'menu-icon'
          }}
          sx={{ display: { xs: 'initial', ms: 'none' } }}
        >
          <Link to="/" aria-label="Go to home page" onClick={handleCloseMenu}>
            <MenuItem>Home</MenuItem>
          </Link>
          <Link to="/companies" aria-label="Go to companies page" onClick={handleCloseMenu}>
            <MenuItem>For companies</MenuItem>
          </Link>
          <Link
            to="/profile"
            aria-label="Go to dashboard"
            onClick={() => {
              handleCloseMenu()
              handleRedirect('profile')
            }}
          >
            <MenuItem>Dashboard</MenuItem>
          </Link>
          <MenuItem
            aria-label="Go to login page"
            onClick={() => {
              handleCloseMenu()
              handleRedirect('login')
            }}
          >
            Login
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header

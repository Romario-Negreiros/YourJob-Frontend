import React from 'react'

import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import AccountCircle from '@mui/icons-material/AccountCircle'
import BusinessIcon from '@mui/icons-material/Business'
import HomeIcon from '@mui/icons-material/Home'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
// import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

const Header: React.FC = () => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>()
  const isMenuOpen = Boolean(menuAnchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (window.innerWidth <= 600) setMenuAnchorEl(event.currentTarget)
  }
  const handleClose = () => setMenuAnchorEl(null)

  return (
    <AppBar sx={{ bgcolor: 'primary.dark' }} position="relative">
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
          <IconButton size="large" edge="end">
            <BusinessIcon />
          </IconButton>
          <IconButton size="large" edge="end">
            <AccountCircle />
          </IconButton>
          <IconButton size="large" edge="end">
            <LoginRoundedIcon />
          </IconButton>
        </Box>
        <Menu
          id="mobile-menu"
          anchorEl={menuAnchorEl}
          open={isMenuOpen}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'menu-icon'
          }}
          sx={{ display: { xs: 'initial', ms: 'none' } }}
        >
          <Link to="/" aria-label="Go to home page" onClick={handleClose}>
            <MenuItem>Home</MenuItem>
          </Link>
          <MenuItem onClick={handleClose}>For companies</MenuItem>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header

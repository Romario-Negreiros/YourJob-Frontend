import React from 'react'

import menuItems from './menuItems'

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

const Header: React.FC = () => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>()
  const isMenuOpen = Boolean(menuAnchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (window.innerWidth <= 600) setMenuAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => setMenuAnchorEl(null)

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
          {menuItems.map(item => (
            <Link key={item.text} to={item.url} aria-label={item.ariaLabel}>
              <IconButton size="large" edge="end">
                {item.icon}
              </IconButton>
            </Link>
          ))}
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
          {menuItems.map(item => (
            <Link
              key={item.text}
              to={item.url}
              aria-label={item.ariaLabel}
              onClick={handleCloseMenu}
            >
              <MenuItem>{item.text}</MenuItem>
            </Link>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header

import React from 'react'

import menuItems from './menuItems'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { clearUser } from '../../app/slices/user'
import { clearCompany } from '../../app/slices/company'

import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'

import AccountIcon from '@mui/icons-material/AccountBox'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const Header: React.FC = () => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>()
  const isMenuOpen = Boolean(menuAnchorEl)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentState = useAppSelector(state => state)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (window.innerWidth <= 600) setMenuAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => setMenuAnchorEl(null)

  const handleLogout = () => {
    if (currentState.user.data) {
      dispatch(clearUser())
    } else if (currentState.company.data) {
      dispatch(clearCompany())
    }
    localStorage.removeItem('jwt')
    localStorage.removeItem('type')
    navigate('/')
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
          {menuItems.map(item => (
            <Tooltip
              key={item.text}
              title={item.text}
              placement={item.text === 'Home' ? 'bottom-start' : 'bottom'}
            >
              <Link to={item.url} aria-label={item.ariaLabel}>
                <IconButton size="large" edge="end">
                  {item.icon}
                </IconButton>
              </Link>
            </Tooltip>
          ))}
          {currentState.user.data && (
            <Tooltip title="Profile" placement="bottom-start">
              <Link to={`/profile/${currentState.user.data.id}`} aria-label="Go to profile page">
                <IconButton size="large" edge="end">
                  <AccountIcon />
                </IconButton>
              </Link>
            </Tooltip>
          )}
          {currentState.company.data && (
            <Tooltip title="Profile" placement="bottom-start">
              <Link
                to={`/companies/profile/${currentState.company.data.id}`}
                aria-label="Go to profile page"
              >
                <IconButton size="large" edge="end">
                  <AccountIcon />
                </IconButton>
              </Link>
            </Tooltip>
          )}
          {currentState.user.data || currentState.company.data ? (
            <Tooltip title="Log out" placement="bottom-start">
              <IconButton size="large" edge="end" onClick={handleLogout}>
                <LogoutRoundedIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Log in" placement="bottom-start">
              <Link to="/login" aria-label="Go to login page">
                <IconButton size="large" edge="end">
                  <LoginRoundedIcon />
                </IconButton>
              </Link>
            </Tooltip>
          )}
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
          {currentState.user.data && (
            <Link
              to={`/profile/${currentState.user.data.id}`}
              aria-label="Go to profile page"
              onClick={handleCloseMenu}
            >
              <MenuItem>Profile</MenuItem>
            </Link>
          )}
          {currentState.company.data && (
            <Link
              to={`/companies/profile/${currentState.company.data.id}`}
              aria-label="Go to profile page"
              onClick={handleCloseMenu}
            >
              <MenuItem>Profile</MenuItem>
            </Link>
          )}
          {currentState.user.data || currentState.company.data ? (
            <MenuItem
              aria-label="Log out"
              onClick={() => {
                handleLogout()
                handleCloseMenu()
              }}
            >
              Log out
            </MenuItem>
          ) : (
            <Link to="/login" aria-label="Go to login page" onClick={handleCloseMenu}>
              <MenuItem>Log in</MenuItem>
            </Link>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header

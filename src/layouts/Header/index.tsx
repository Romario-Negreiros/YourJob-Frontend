import React from 'react'

// import useStyles from './styles'

import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import BusinessIcon from '@mui/icons-material/Business'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
// import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

const Header: React.FC = () => {
  // const classes = useStyles()
  const [popperAnchorEl, setPopperAnchorEl] = React.useState<null | HTMLElement>()
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>()
  const isPopperOpen = Boolean(popperAnchorEl)
  const popperId = isPopperOpen ? 'popper' : undefined
  const isMenuOpen = Boolean(menuAnchorEl)

  const handleMouseLeave = () => setPopperAnchorEl(null)
  const handleMouseOver = (event: React.MouseEvent<HTMLElement>) =>
    setPopperAnchorEl(event.currentTarget)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (window.innerWidth <= 600) setMenuAnchorEl(event.currentTarget)
  }
  const handleClose = () => setMenuAnchorEl(null)

  return (
    <AppBar elevation={0}>
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
            <MenuIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <IconButton
            size="large"
            edge="end"
            aria-describedby={popperId}
            onMouseLeave={handleMouseLeave}
            onMouseOver={handleMouseOver}
          >
            <BusinessIcon />
          </IconButton>
          <Popper id={popperId} open={isPopperOpen} anchorEl={popperAnchorEl} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={{ exit: 0, enter: 350 }}>
                <Box sx={{ mt: 1.2, borderRadius: 10, p: 1.5, bgcolor: 'background.paper' }}>
                  <Typography variant="body2">For companies</Typography>
                </Box>
              </Fade>
            )}
          </Popper>
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
          <MenuItem onClick={handleClose}>For companies</MenuItem>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header

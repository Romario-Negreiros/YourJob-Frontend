import React from 'react'

import useStyles from '../styles'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import { ProfileDrawer, SavedVagancies, UserProfileInfo } from '../../../components'

import BookmarksIcon from '@mui/icons-material/Bookmarks'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

import { Item } from '../interfaces'

const initialListItems: Item[] = [
  {
    text: 'Profile Info',
    icon: <AccountBoxIcon color="primary"/>,
    component: <UserProfileInfo key="proflieInfo" />,
    active: true
  },
  {
    text: 'Saved Vagancies',
    icon: <BookmarksIcon color="primary"/>,
    component: <SavedVagancies key="savedVagancies" />,
    active: false
  }
]

const UserProfile: React.FC = () => {
  const [listItems, setListItems] = React.useState<Item[]>(initialListItems)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const classes = useStyles()

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

  const handleActiveItem = (newActiveItemIndex: number, oldActiveItemIndex: number) => {
    const listItemsCopy = [...listItems]
    listItemsCopy[newActiveItemIndex].active = true
    listItemsCopy[oldActiveItemIndex].active = false
    setListItems(listItemsCopy)
  }

  return (
    <Box className={classes.box}>
      <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
          }}
        >
          <ProfileDrawer listItems={listItems} handleActiveItem={handleActiveItem} handleDrawerToggle={handleDrawerToggle}/>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' }
          }}
        >
          <ProfileDrawer listItems={listItems} handleActiveItem={handleActiveItem}/>
        </Drawer>
      </Box>

      <Grid container rowSpacing={4} sx={{ placeItems: 'center' }}>
        <Grid item xs={12} sx={{ textAlign: 'center', display: { xs: 'block', sm: 'none' } }}>
          <Button variant="contained" aria-label="Open options" onClick={handleDrawerToggle}>
            Open options
          </Button>
        </Grid>
        <Grid item xs={12}>
          {listItems.map(item => {
            if (item.active) {
              return item.component
            } else return null
          })}
        </Grid>
      </Grid>
    </Box>
  )
}

export default UserProfile

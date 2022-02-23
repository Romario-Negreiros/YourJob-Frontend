import React from 'react'

import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { Props } from './interfaces'

const ProfileDrawer: React.FC<Props> = ({ listItems, handleActiveItem, handleDrawerToggle }) => {
  const activeItemIndex = listItems.findIndex(item => item.active)

  return (
    <Box>
      <Toolbar />
      <List>
        {listItems.map((item, index) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              if (handleDrawerToggle) handleDrawerToggle()
              handleActiveItem(index, activeItemIndex)
            }}
            sx={{ background: item.active ? '#f4f4f4' : 'initial' }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default ProfileDrawer

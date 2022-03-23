import React from 'react'

import useStyles from '../styles'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { ProfileDrawer, SavedVagancies, UserProfileInfo } from '../../../components'

import BookmarksIcon from '@mui/icons-material/Bookmarks'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

import { UserItem } from '../interfaces'
import { User } from '../../../app/slices/user/interfaces'

const initialListItems: UserItem[] = [
  {
    text: 'Profile Info',
    icon: <AccountBoxIcon color="primary" />,
    renderComponent: (
      user: User,
      setUser: (user: User | null) => void,
      isCurrentUser?: boolean
    ) => (
      <UserProfileInfo
        key="proflieInfo"
        user={user}
        setUser={setUser}
        isCurrentUser={isCurrentUser}
      />
    ),
    active: true
  },
  {
    text: 'Saved Vagancies',
    icon: <BookmarksIcon color="primary" />,
    renderComponent: (user: User) => <SavedVagancies key="savedVagancies" user={user} />,
    active: false
  }
]

const UserProfile: React.FC = () => {
  const [listItems, setListItems] = React.useState<UserItem[]>(initialListItems)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [error, setError] = React.useState('')
  const currentUser = useAppSelector(state => state.user.data)
  const params = useParams()
  const navigate = useNavigate()
  const classes = useStyles()

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

  const handleActiveItem = (newActiveItemIndex: number, oldActiveItemIndex: number) => {
    const listItemsCopy = [...listItems]
    listItemsCopy[newActiveItemIndex].active = true
    listItemsCopy[oldActiveItemIndex].active = false
    setListItems(listItemsCopy)
  }

  const goBack = () => {
    navigate(-1)
  }

  React.useEffect(() => {
    if (!params.id?.match(/^\d*$/)) {
      setError('Invalid user id!')
      setIsLoaded(true)
    } else if (currentUser && params.id === currentUser.id) {
      setUser(currentUser)
      setIsLoaded(true)
    } else {
      (async () => {
        try {
          const response = await fetch(
            `https://yourjob-api.herokuapp.com/users/profile/${params.id}`,
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )
          const body = await response.json()
          if (response.ok) {
            console.log(body)
            setUser(body.user as User)
            return
          }
          throw new Error(body.error)
        } catch (err) {
          err instanceof Error ? setError(err.message) : setError("Unable to load user's profile!")
        } finally {
          setIsLoaded(true)
        }
      })()
    }
  }, [])

  if (!isLoaded) {
    return (
      <Box
        className={classes.box}
        sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
        <CircularProgress color="secondary" />
      </Box>
    )
  } else if (error) {
    return (
      <Box
        className={classes.box}
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '5px'
        }}
      >
        <Alert severity="error">{error}</Alert>
        <Button variant="outlined" color="error" onClick={goBack}>
          Go back
        </Button>
      </Box>
    )
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
          <ProfileDrawer
            listItems={listItems}
            handleActiveItem={handleActiveItem}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
          }}
        >
          <ProfileDrawer listItems={listItems} handleActiveItem={handleActiveItem} />
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
              if (user?.id === currentUser?.id) {
                return item.renderComponent(user as User, setUser, true)
              }
              return item.renderComponent(user as User)
            } else return null
          })}
        </Grid>
      </Grid>
    </Box>
  )
}

export default UserProfile

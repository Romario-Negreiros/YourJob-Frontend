import React from 'react'

import useStyles from '../styles'
import { useAppSelector } from '../../../app/hooks'
import { useParams, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import {
  ProfileDrawer,
  CreatedVagancies,
  CompanyProfileInfo,
  CreateVagancyForm,
  Avaliations,
  CreateAvaliationForm
} from '../../../components'

import BusinessIcon from '@mui/icons-material/Business'
import PeopleIcon from '@mui/icons-material/People'
import AddIcon from '@mui/icons-material/Add'
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown'

import { CompanyItem } from '../interfaces'
import { Company } from '../../../app/slices/company/interfaces'

const initialListItems: CompanyItem[] = [
  {
    text: 'Profile Info',
    icon: <BusinessIcon color="primary" />,
    renderComponent: (
      company: Company,
      setCompany: (company: Company | null) => void,
      isCurrentCompany?: boolean
    ) => (
      <CompanyProfileInfo
        key="proflieInfo"
        company={company}
        setCompany={setCompany}
        isCurrentCompany={isCurrentCompany}
      />
    ),
    active: true
  },
  {
    text: 'Created Vagancies',
    icon: <PeopleIcon color="primary" />,
    renderComponent: (company: Company) => (
      <CreatedVagancies key="createdVagancies" company={company} />
    ),
    active: false
  },
  {
    text: 'Create Vagancy',
    icon: <AddIcon color="primary" />,
    renderComponent: (company: Company) => (
      <CreateVagancyForm key="createVagancyForm" company={company} />
    ),
    active: false
  },
  {
    text: 'Avaliations',
    icon: <ThumbsUpDownIcon color="primary" />,
    renderComponent: (company: Company) => <Avaliations key="avaliations" company={company} />,
    active: false
  },
  {
    text: 'Avaliate',
    icon: <AddIcon color="primary" />,
    renderComponent: (company: Company) => (
      <CreateAvaliationForm key="createAvaliationForm" company={company} />
    ),
    active: false
  }
]

const CompanyProfile: React.FC = () => {
  const [listItems, setListItems] = React.useState<CompanyItem[]>(initialListItems)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [company, setCompany] = React.useState<Company | null>(null)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [error, setError] = React.useState('')
  const currentCompany = useAppSelector(state => state.company.data)
  const params = useParams()
  const navigate = useNavigate()
  const classes = useStyles()

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

  const handleActiveItem = (newActiveItemIndex: number, oldActiveItemIndex: number) => {
    if (newActiveItemIndex === oldActiveItemIndex) return
    const listItemsCopy = [...listItems]
    listItemsCopy[newActiveItemIndex].active = true
    listItemsCopy[oldActiveItemIndex].active = false
    setListItems(listItemsCopy)
  }

  const goBack = () => {
    navigate(-1)
  }

  React.useEffect(() => {
    const controller = new AbortController()
    if (!params.id?.match(/^\d*$/)) {
      setError('Invalid company id!')
      setIsLoaded(true)
    }
    if (currentCompany && params.id === currentCompany.id) {
      setCompany(currentCompany)
      setIsLoaded(true)
    } else {
      ;(async () => {
        try {
          const response = await fetch(
            `https://yourjob-api.herokuapp.com/companies/profile/${params.id}`,
            {
              headers: new Headers({
                'Content-Type': 'application/json'
              })
            }
          )
          const body = await response.json()
          if (response.ok) {
            if (body.company.verifyEmailToken) {
              setError('This company has not verified its email yet!')
            } else {
              setCompany(body.company as Company)
            }
            return
          }
          throw new Error(body.error)
        } catch (err) {
          err instanceof Error ? setError(err.message) : setError("Unable to load company's profile!")
        } finally {
          setIsLoaded(true)
        }
      })()
    }

    return () => controller.abort()
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
            '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' }
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
              if (company?.id === currentCompany?.id) {
                return item.renderComponent(company as Company, setCompany, true)
              }
              return item.renderComponent(company as Company)
            } else return null
          })}
        </Grid>
      </Grid>
    </Box>
  )
}

export default CompanyProfile

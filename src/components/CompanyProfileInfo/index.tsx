import React from 'react'

import useStyles from '../../styles/global'

import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'

import { Company } from '../../app/slices/company/interfaces'

interface Props {
  company: Company
}

const CompanyProfileInfo: React.FC<Props> = ({ company }) => {
  const classes = useStyles()

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Avatar sx={{ margin: 'auto' }}>C</Avatar>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <Box>
            <Typography variant="h6" component="div">
              Name
            </Typography>
            <Typography variant="body1" component="div" sx={{ mt: 2 }}>
              company.name
            </Typography>
          </Box>
          <Button variant="contained">Change</Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <Box>
            <Typography variant="h6" component="div">
              Password
            </Typography>
            <Typography variant="body1" component="div" sx={{ mt: 2 }}>
              secret :)
            </Typography>
          </Box>
          <Button variant="contained">Change</Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <Box>
            <Typography variant="h6" component="div">
              Description
            </Typography>
            <Typography variant="body1" component="div" sx={{ mt: 2 }}>
              company.description
            </Typography>
          </Box>
          <Button variant="contained">Change</Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <Box>
            <Typography variant="h6" component="div">
              Phone number
            </Typography>
            <Typography variant="body1" component="div" sx={{ mt: 2 }}>
              +55 (47)987654321
            </Typography>
          </Box>
          <Box>
            <Button variant="contained">Change</Button>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <Box>
            <Typography variant="h6" component="div">
              Region
            </Typography>
            <Typography variant="body1" component="div" sx={{ mt: 2 }}>
              company.region
            </Typography>
          </Box>
          <Box>
            <Button variant="contained">Change</Button>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <Box>
            <Typography variant="h6" component="div">
              Website
            </Typography>
            <Link href="#" variant="body1" underline="always" download sx={{ display: 'inline-block', mt: 2 }}>
                www.companyname.com
            </Link>
          </Box>
          <Box>
            <Button variant="contained">Change</Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default CompanyProfileInfo

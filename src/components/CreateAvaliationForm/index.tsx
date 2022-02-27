import React from 'react'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

const CreateAvaliationForm: React.FC = () => {
  const [recommendation, setRecommendation] = React.useState('')
  const [grade, setGrade] = React.useState<string | number>('')

  const handleRecommendationChange = (event: SelectChangeEvent) =>
    setRecommendation(event.target.value)
  const handleGradeChange = (event: SelectChangeEvent) => setGrade(Number(event.target.value))

  return (
    <Grid container component="form" spacing={4}>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <TextField label="Comment" multiline rows={4} sx={{ width: '100%' }} />
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
        <FormControl sx={{ width: 240 }}>
          <InputLabel id="grade">Grade</InputLabel>
          <Select labelId="grade" value={String(grade)} onChange={handleGradeChange} label="Grade">
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
        <FormControl sx={{ width: 240 }}>
          <InputLabel id="recommendation">Recommendation</InputLabel>
          <Select
            labelId="recommendation"
            value={recommendation}
            onChange={handleRecommendationChange}
            label="Recommendation"
          >
            <MenuItem value={'I recommend'}>I recommend</MenuItem>
            <MenuItem value={"I don't recommend"}>I don&apos;t recommend</MenuItem>
            <MenuItem value={"I'm neutral"}>I&apos;m neutral</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Button variant="contained" type="submit">
          Create
        </Button>
      </Grid>
    </Grid>
  )
}

export default CreateAvaliationForm

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Company } from './interfaces'

type CompanyState = {
  data: Company | null
}

const initialState: CompanyState = {
  data: null
}

const company = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      state.data = action.payload
    },
    updateCompany: (state, action: PayloadAction<Company>) => {
      const { payload } = action
      state.data = { ...state, ...payload }
    },
    clearCompany: state => {
      state.data = null
    }
  }
})

export const { setCompany, updateCompany, clearCompany } = company.actions

export default company.reducer

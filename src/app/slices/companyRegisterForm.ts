import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Inputs as AuthFormInputs } from '../../components/AuthForm/interfaces'
import { Inputs as CompanyProfileFormInputs } from '../../components/CompanyProfileForm/interfaces'

export interface Inputs extends AuthFormInputs, Omit<CompanyProfileFormInputs, 'companyLogo'> {
  companyLogo: string
}

type FormState = {
  data: Partial<Inputs> | null
}

const initialState: FormState = {
  data: null
}

const companyRegisterFormSlice = createSlice({
  name: 'companyRegisterFormData',
  initialState,
  reducers: {
    updateData: (state, action: PayloadAction<Partial<Inputs>>) => {
      const { payload } = action
      state.data = { ...state.data, ...payload }
    },
    resetData: state => {
      state.data = null
    }
  }
})

export const { updateData, resetData } = companyRegisterFormSlice.actions

export default companyRegisterFormSlice.reducer

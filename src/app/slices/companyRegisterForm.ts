import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Inputs as AuthFormInputs } from '../../components/AuthForm/interfaces'
import { Inputs as CompanyProfileFormInputs } from '../../components/CompanyProfileForm/interfaces'

interface Inputs extends AuthFormInputs, CompanyProfileFormInputs {}

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
      if (payload.companyLogo) {
        const companyLogo = payload.companyLogo as FileList
        payload.companyLogo = JSON.stringify(companyLogo[0])
      }
      state.data = { ...state, ...payload }
    },
    resetData: (state) => {
      state.data = null
    }
  }
})

export const { updateData, resetData } = companyRegisterFormSlice.actions

export default companyRegisterFormSlice.reducer

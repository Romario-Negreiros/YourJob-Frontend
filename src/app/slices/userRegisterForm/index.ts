import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Inputs as AuthFormInputs } from '../../../components/AuthForm/interfaces'
import { Inputs as UserProfileFormInputs } from '../../../components/UserProfileForm/interfaces'

export interface Inputs
  extends AuthFormInputs,
    Omit<UserProfileFormInputs, 'profilePicture' | 'curriculum'> {
  profilePicture: string
  curriculum: string
}

type FormState = {
  data: Partial<Inputs> | null
}

const initialState: FormState = {
  data: null
}

const userRegisterFormSlice = createSlice({
  name: 'userRegisterFormData',
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

export const { updateData, resetData } = userRegisterFormSlice.actions

export default userRegisterFormSlice.reducer

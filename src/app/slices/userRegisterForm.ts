import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Inputs as AuthFormInputs } from '../../components/AuthForm/interfaces'
import { Inputs as UserProfileFormInputs } from '../../components/UserProfileForm/interfaces'

interface Inputs extends AuthFormInputs, UserProfileFormInputs {}

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
      if (payload.profilePicture) {
        const profilePicture = payload.profilePicture as FileList
        payload.profilePicture = JSON.stringify(profilePicture[0])
      }
      if (payload.curriculum) {
        const curriculum = payload.curriculum as FileList
        payload.curriculum = JSON.stringify(curriculum[0])
      }
      console.log(payload)
      state.data = { ...state, ...payload }
    },
    resetData: (state) => {
      state.data = null
    }
  }
})

export const { updateData, resetData } = userRegisterFormSlice.actions

export default userRegisterFormSlice.reducer

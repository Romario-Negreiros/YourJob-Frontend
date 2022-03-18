import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from './interfaces'

type UserState = {
  data: User | null
}

const initialState: UserState = {
  data: null
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const { payload } = action
      state.data = { ...state, ...payload }
    },
    clearUser: state => {
      state.data = null
    }
  }
})

export const { setUser, updateUser, clearUser } = user.actions

export default user.reducer

import { configureStore } from '@reduxjs/toolkit'

import { userRegisterForm, companyRegisterForm } from './slices'

const store = configureStore({
  reducer: {
    userRegisterForm,
    companyRegisterForm
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

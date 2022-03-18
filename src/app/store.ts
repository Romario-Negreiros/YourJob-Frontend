import { configureStore } from '@reduxjs/toolkit'

import { userRegisterForm, companyRegisterForm, user, company } from './slices'

const store = configureStore({
  reducer: {
    userRegisterForm,
    companyRegisterForm,
    user,
    company
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

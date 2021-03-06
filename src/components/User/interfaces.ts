import { User } from '../../app/slices/user/interfaces'

export interface Props {
  breakpoints: {
    xs: number
    sm: number
    md: number
    lg?: number
  }
  user: User
}

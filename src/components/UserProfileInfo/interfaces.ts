import { User } from '../../app/slices/user/interfaces'

export interface Props {
  user: User
  setUser: (user: User | null) => void
  isCurrentUser?: boolean
}

export interface Inputs {
  profilePicture: FileList
  name: string
  bio: string
  age: number
  workingArea: string
  curriculum: FileList
}

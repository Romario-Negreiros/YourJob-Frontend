export interface Response {
  user: {
    id: string
    name: string
    email: string
    bio: string
    age: number
    workingArea: string
    profilePicture?: string
    curriculum?: string
  }
  token: string
  success: string
}

interface Vagancy {
  id: Readonly<number>
  companyId: string
  description: string
  salary: number
  position: string
  category: string
  createdAt: Readonly<string>
  updatedAt: Readonly<string>
}

export interface Company {
  id: Readonly<number>
  name: string
  email: string
  description: string
  country: string
  contactNumber: number
  alpha2Code: string
  website: string
  companyLogo: string
  'company:vagancies': Vagancy[]
  passwordResetToken: string | null
  resetTokenExpiration: string | null
  verifyEmailToken: string | null
  verifyTokenExpiration: string | null
  createdAt: Readonly<string>
  updatedAt: Readonly<string>
}

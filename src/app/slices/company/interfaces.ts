export interface Vacancy {
  id: Readonly<number>
  companyId: string
  description: string
  salary: number
  position: string
  category: string
  'company:vacancies': Company
  createdAt: Readonly<string>
  updatedAt: Readonly<string>
}

export interface Company {
  id: Readonly<number>
  name: string
  email: string
  description: string
  country: string
  contactNumber: string
  alpha2Code: string
  website: string
  companyLogo: string
  'company:vacancies': Vacancy[]
  passwordResetToken: string | null
  resetTokenExpiration: string | null
  verifyEmailToken: string | null
  verifyTokenExpiration: string | null
  createdAt: Readonly<string>
  updatedAt: Readonly<string>
}

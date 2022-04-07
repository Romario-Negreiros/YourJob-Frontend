export interface Avaliation {
  id: Readonly<number>
  companyId: Readonly<number>
  recommendation: string
  comment: string
  grade: number
  createdAt: Readonly<string>
  updatedAt: Readonly<string>
}

export interface Vacancy {
  id: Readonly<number>
  companyId: Readonly<number>
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
  companyLogo: string | null
  'company:vacancies': Vacancy[]
  'company:avaliations': Avaliation[]
  passwordResetToken: string | null
  resetTokenExpiration: string | null
  verifyEmailToken: string | null
  verifyTokenExpiration: string | null
  createdAt: Readonly<string>
  updatedAt: Readonly<string>
}

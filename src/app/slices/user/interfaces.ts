import { Vacancy } from '../company/interfaces'

export interface User {
  id: Readonly<number>;
  name: string;
  email: string;
  bio: string;
  profilePicture: string | null;
  curriculum: string | null;
  workingArea: string;
  age: number;
  savedVacancies: Vacancy[]
  passwordResetToken: string | null;
  resetTokenExpiration: string | null;
  verifyEmailToken: string | null;
  verifyTokenExpiration: string | null;
  createdAt: Readonly<string>;
  updatedAt: Readonly<string>;
}

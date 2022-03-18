export interface User {
  id: Readonly<string>;
  name: string;
  email: string;
  bio: string;
  profilePicture: string | null;
  curriculum: string | null;
  workingArea: string;
  age: number;
  passwordResetToken: string | null;
  resetTokenExpiration: string | null;
  verifyEmailToken: string | null;
  verifyTokenExpiration: string | null;
  createdAt: Readonly<string>;
  updatedAt: Readonly<string>;
}

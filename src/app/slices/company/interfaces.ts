export interface Company {
  id: Readonly<string>;
  name: string;
  email: string;
  description: string;
  country: string;
  contactNumber: string;
  alpha2Code: string;
  website: string;
  companyLogo: string;
  passwordResetToken: string | null;
  resetTokenExpiration: string | null;
  verifyEmailToken: string | null;
  verifyTokenExpiration: string | null;
  createdAt: Readonly<string>;
  updatedAt: Readonly<string>;
}

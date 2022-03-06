export interface Inputs {
  description: string;
  country: string;
  region: string;
  address: string;
  contactNumber: string;
  website: string;
  companyLogo: FileList | File | string;
}

export interface Props {
  handleNext: () => void;
}

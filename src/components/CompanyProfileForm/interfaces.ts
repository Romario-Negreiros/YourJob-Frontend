export interface Inputs {
  description: string;
  country: string;
  address: string;
  contactNumber: string;
  website: string;
  companyLogo: FileList;
}

export interface Props {
  handleNext: () => void;
}

export interface Inputs {
  description: string;
  country: string;
  contactNumber: string;
  website: string;
  companyLogo: FileList;
}

export interface Props {
  handleNext: () => void;
}

export interface Country {
  name: string;
  flags: string[];
  alpha2Code: string;
  callingCodes: string[]
}

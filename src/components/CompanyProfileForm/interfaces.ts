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
  name: {
    common: string;
    official: string;
    nativeName: Object;
  }
  cca2: string;
  idd: {
    root: string;
    suffixes: string[];
  }
  flags: {
    svg: string;
    png: string;
  };
}

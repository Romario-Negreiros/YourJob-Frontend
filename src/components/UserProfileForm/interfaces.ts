export interface Inputs {
  bio: string;
  profilePicture: FileList | File| string;
  curriculum: FileList | File | string;
}

export interface Props {
  handleNext: () => void;
}

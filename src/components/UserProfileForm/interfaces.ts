export interface Inputs {
  bio: string;
  profilePicture: FileList;
  curriculum: FileList;
}

export interface Props {
  handleNext: () => void;
}

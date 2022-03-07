export interface Inputs {
  bio: string;
  age: number;
  workingArea: string;
  profilePicture: FileList;
  curriculum: FileList;
}

export interface Props {
  handleNext: () => void;
}

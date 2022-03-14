import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

export interface Inputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Props {
  handleNext: () => void;
  updateData: ActionCreatorWithPayload<Partial<Inputs>, string>;
  mode: string;
}

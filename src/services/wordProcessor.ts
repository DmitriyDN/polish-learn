import { common, green, red } from "@mui/material/colors";

export enum WordValid {
  PENDING,
  VALID,
  INVALID,
}

export const wordColor = (status: WordValid) => {
  switch (status) {
    case WordValid.INVALID:
      return red[400];
    case WordValid.VALID:
      return green[400];
    default:
      return common.black;
  }
};

import { css } from "lit";

export const noPrintStyles = css`
  @media print {
    .no_print {
      display: none;
    }
  }
`;

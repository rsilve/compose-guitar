import { css } from "lit";

export const inputStyles = css`
  input,
  textarea {
    font-size: 1em;
    color: var(--color-text);
    padding: 0.25em 0.5em;
    background-color: var(--color-background);
    border: 2px solid var(--input-border);
    border-radius: 4px;
    transition: 180ms box-shadow ease-in-out;
    autocomplete: off;
    box-sizing: border-box;
  }

  input:invalid,
  input.invalid,
  textarea:invalid,
  textarea.invalid {
    border: 2px solid var(--color-error);
  }

  input + input,
  input + textarea,
  textarea + input,
  .form-item + .form-item {
    margin-top: 0.6ex;
  }

  input:focus,
  textarea:focus {
    border-color: hsl(var(--input-focus-h), var(--input-focus-s), var(--input-focus-l));
    box-shadow: 0 0 0 2px hsla(var(--input-focus-h), var(--input-focus-s), calc(var(--input-focus-l) + 20%), 0.8);
    outline: 2px solid transparent;
  }

  .form-item {
    position: relative;
  }
`;

import { css } from "lit";

const inputStyles = css`
  input,
  textarea {
    font-size: 1em;
    color: var(--theme-on-surface);
    padding: 0.25em 0.5em;
    background-color: var(--theme-surface);
    border: 2px solid var(--theme-surface-darker);
    border-radius: 4px;
    transition: 180ms box-shadow ease-in-out;
    autocomplete: off;
    box-sizing: border-box;
  }

  input:invalid,
  input.invalid,
  textarea:invalid,
  textarea.invalid {
    border: 2px solid var(--theme-error);
  }

  input + input,
  input + textarea,
  textarea + input,
  .form-item + .form-item {
    margin-top: 1.2ex;
  }

  input:focus,
  textarea:focus {
    box-shadow: 0 0 0 2px var(--theme-surface-lighter);
    outline: 2px solid transparent;
  }

  .form-item {
    position: relative;
  }

  .input-label {
    position: absolute;
    top: -1ex;
    left: 1em;
    font-size: 0.9em;
    font-weight: lighter;
    background-color: var(--theme-surface);
    padding: 0 4px;
  }

  .input-label + input,
  .input-label + textarea {
    display: block;
    padding-top: 0.3em;
  }
`;

export default inputStyles;

import { css } from "lit";

const buttonStyles = css`
  button {
    position: relative;
    overflow: hidden;

    background-color: var(--theme-primary);
    color: var(--theme-on-primary);
    border: 1px solid var(--theme-primary-lighter);
    border-radius: var(--border-radius);
    font-size: 1em;
    padding: 0.5em 1em;
    min-width: 7em;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);

    outline: 2px solid transparent;
  }

  button:active {
    background-color: var(--theme-primary-lighter);
  }

  button + button {
    margin-left: 1em;
  }

  button[disabled] {
    color: var(--theme-on-primary);
    cursor: not-allowed;
  }

  button.btn-secondary {
    background-color: var(--theme-secondary);
    color: var(--theme-on-secondary);
    border: 1px solid var(--theme-secondary-lighter);
  }

  button.btn-secondary:active {
    background-color: var(--theme-secondary-lighter);
    outline: 2px solid transparent;
  }

  button.btn-small {
    padding: 0.15em 0.3em;
  }
`;

export default buttonStyles;

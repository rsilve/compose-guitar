import { css } from "lit";

const buttonStyles = css`
  button {
    background-color: var(--theme-primary);
    color: var(--theme-on-primary);
    border: 2px solid var(--theme-primary-darker);
    border-radius: var(--border-radius);
    font-size: 1em;
    padding: 0.3em 0.6em;
  }

  button[disabled] {
    color: var(--theme-on-primary);
    cursor: not-allowed;
  }

  button:focus {
    box-shadow: 0 0 0 2px var(--theme-primary-lighter);
    outline: 2px solid transparent;
  }

  button.btn-secondary {
    background-color: var(--theme-secondary);
    color: var(--theme-on-secondary);
    border: 2px solid var(--theme-secondary-darker);
  }

  button.btn-secondary:focus {
    box-shadow: 0 0 0 2px var(--theme-secondary-lighter);
    outline: 2px solid transparent;
  }

  button.btn-small {
    padding: 0.15em 0.3em;
  }

  button:active {
    transform: scale(1.2);
  }
`;

export default buttonStyles;

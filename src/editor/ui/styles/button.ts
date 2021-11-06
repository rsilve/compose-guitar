import {css} from "lit";

export const buttonStyles = css`
button {
    background-color: var(--color-button);
    color: var(--color-button-text);
    border: 2px solid var(--color-headline);
    border-radius: var(--border-radius);
    font-size: 1em;
    padding: .3em .6em;
}

button[disabled] {
    color: var(--color-button-text-disabled);
    cursor: not-allowed;
}

button:focus {
    border-color: hsl(var(--input-focus-h), var(--input-focus-s), var(--input-focus-l));
    box-shadow: 0 0 0 2px hsla(var(--input-focus-h), var(--input-focus-s), calc(var(--input-focus-l) + 20%), 0.8);
    outline: 2px solid transparent;
}

button.btn-secondary {
    background-color: var(--color-background);
}

button.btn-small {
    padding: .15em .3em;
}



`;
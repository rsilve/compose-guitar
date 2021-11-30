import { css } from "lit";

export default css`
  table.grid {
    text-shadow: 0 0 1px var(--color-background);
  }
  table.grid,
  td.grid {
    border-collapse: collapse;
    margin: 0;
  }

  .grid-measure {
    --measure-width: 4em;
    --measure-height: 3.5em;
    width: var(--measure-width);
    min-width: var(--measure-width);
    max-width: var(--measure-width);
    height: var(--measure-height);
    min-height: var(--measure-height);
    max-height: var(--measure-height);
    border: 2px var(--grid-border-color) solid;
  }

  td.grid-measure {
    font-size: 1.4em;
    position: relative;
    text-align: center;
  }

  table {
    border-collapse: collapse;
  }

  .grid-measure > table > tbody > tr > td {
    width: 50%;
    height: 50%;
  }

  table.grid-measure-1 {
    width: 100%;
    height: 100%;
  }

  table.grid-measure-2,
  table.grid-measure-4,
  table.grid-measure-5,
  table.grid-measure-6,
  table.grid-measure-7,
  table.grid-measure-8 {
    font-size: 0.7em;
    width: 100%;
    height: 100%;
  }

  table.grid-measure-3 {
    font-size: 0.7em;
    width: 100%;
    height: 100%;
  }

  .grid-measure-beat-1 {
    border-right: 1px var(--grid-border-color) solid;
    border-bottom: 1px var(--grid-border-color) solid;
    height: 50%;
  }

  .grid-measure-beat-2 {
    border-left: 1px var(--grid-border-color) solid;
    border-bottom: 1px var(--grid-border-color) solid;
    height: 50%;
  }

  .grid-measure-beat-3 {
    border-right: 1px var(--grid-border-color) solid;
    border-top: 1px var(--grid-border-color) solid;
    width: 50%;
    height: 50%;
  }

  .grid-measure-beat-4 {
    border-left: 1px var(--grid-border-color) solid;
    border-top: 1px var(--grid-border-color) solid;
    height: 50%;
  }

  .grid-measure-beat-12 {
    padding-right: 30%;
    height: 50%;
  }

  .grid-measure-beat-34 {
    padding-left: 30%;
    border-top: 1px var(--grid-border-color) solid;
    height: 50%;
  }

  .grid-measure-part {
    position: absolute;
    top: -1px;
    left: -1px;
    font-size: 0.6em;
    padding-left: 3px;
    padding-right: 4px;
    padding-bottom: 2px;
    border-radius: 0 0 3px 0;
    background-color: var(--grid-border-color);
    color: transparent;
  }

  @media print {
    .grid-measure-part {
      background-color: transparent;
      color: var(--grid-border-color);
      border: 1px solid var(--grid-border-color);
    }
  }

  .grid-measure-repeat-right {
    position: absolute;
    top: 1px;
    right: 3px;
    height: var(--measure-height);
    line-height: var(--measure-height);
    color: var(--grid-border-color);
    font-weight: bold;
    border-right: 2px var(--grid-border-color) solid;
  }

  .grid-measure-repeat-left > span,
  .grid-measure-repeat-right > span {
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
    padding-bottom: 0.6ex;
  }

  .grid-measure-repeat-left {
    position: absolute;
    top: 1px;
    left: 3px;
    height: var(--measure-height);
    line-height: var(--measure-height);
    color: var(--grid-border-color);
    font-weight: bold;
    border-left: 2px var(--grid-border-color) solid;
  }

  .chord_note_detail {
    position: relative;
    display: inline-block;
    line-height: 1em;
    height: 1em;
    padding-right: 0.8ex;
    margin-left: -2px;
  }

  .chord_note_modifier {
    display: inline-block;
    font-size: 0.5em;
    font-style: italic;
    position: absolute;
    line-height: 0;
    top: 1.2ex;
    left: 0px;
  }

  .chord_base_note {
    position: relative;
  }
  .chord_base_note_modifier {
    position: absolute;
    font-size: 0.5em;
    font-style: italic;
    margin-left: -0.2ex;
    line-height: 0;
    top: 0.9ex;
  }

  .chord_note_color {
    display: inline-block;
    font-size: 0.5em;
    font-style: italic;
    position: absolute;
    top: 1em;
    left: 1px;
  }

  .chord_note_extension {
    font-size: 0.8em;
  }
`;

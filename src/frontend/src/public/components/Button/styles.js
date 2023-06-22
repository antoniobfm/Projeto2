const style = new CSSStyleSheet();

style.replaceSync(`
  .button {
    width: 100%;
    height: 40px;

    border-radius: 5px;

    background: var(--color-primary);
    border: none;
    outline: none;

    font-family: "DM Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 150%;

    /* White */

    color: #ffffff;

    text-transform: uppercase;
  }

  .button:hover {
    filter: brightness(0.9);
    transition: 0.2s;
    cursor: pointer;
  }
`);

export default style;

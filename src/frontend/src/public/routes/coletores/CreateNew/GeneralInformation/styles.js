const style = new CSSStyleSheet();

style.replaceSync(/*css*/`
:host {
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 24px;
}
`);

export default style;

const style = new CSSStyleSheet();

style.replaceSync(/*css*/`
:host {
}

#dashboard {
    width: 100%;
    height: 100vh;
    overflow: hidden;

    display: grid;
    grid-template-columns: auto 280px 1fr 320px;

    gap: 24px;

    padding-right: 24px;
}
`);

export default style;

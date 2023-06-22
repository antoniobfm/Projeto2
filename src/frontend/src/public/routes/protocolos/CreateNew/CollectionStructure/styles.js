const style = new CSSStyleSheet();

style.replaceSync(/*css*/`
:host {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 24px;
}

#collectionFieldsContainer {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 24px;

    padding: 0px 0px 80px;
}

#addCollectionFieldButton {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 16px;

    cursor: pointer;
}
`);

export default style;

const style = new CSSStyleSheet();

style.replaceSync(`
.input-container {
    width: 100%;

}

.input {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: none;
    width: 100%;
    font-size: 1rem;
    color: var(--color-gray-800);
    background-color: #f5f5f5;

    box-sizing: border-box;
}

.label {
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;
    line-height: 150%;
    /* identical to box height, or 27px */
    
    text-align: right;
    
    /* Gray 800 */
    
    color: var(--color-gray-800);
}
`);

export default style;

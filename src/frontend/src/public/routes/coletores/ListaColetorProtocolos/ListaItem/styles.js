const style = new CSSStyleSheet();

style.replaceSync(/*css*/`
  .lista-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 24px;
    gap: 10px;
    background: #F3F4F6;
    border: none;
    outline: none;
    border-radius: 4px;
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    display: flex;
    align-items: center;
    color: #111827;
  }
  
  .lista-item:hover {
    filter: brightness(0.9);
    transition: 0.2s;
    cursor: pointer;
  }

  .active {
    background: var(--color-gray-900);
    color: var(--color-gray-100);
  }
`);

export default style;

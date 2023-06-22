const style = new CSSStyleSheet();
style.replaceSync(`
:host {
    width: 100%;
}

button {
    width: 100%;

  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
}

.button-container {
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 16px;
    
    border-radius: 4px;
}

.button-container:hover {
    background: var(--color-gray-100);

    transition: 0.2s;
}

svg {
  margin-right: 8px;
}

span {
  margin-right: 8px;
}

.active {
    background: #D1D5DB;
    border-radius: 5px;

    transition: 0.2s;
}
`);

export default style;

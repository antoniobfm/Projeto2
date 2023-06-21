const style = new CSSStyleSheet();

style.replaceSync(/*css*/`
.structure-item {
    width: 210px;
    height: 122px;
    background: #F3F4F6;
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    gap: 4px;
}

.tag {
    box-sizing: border-box;

    /* Auto layout */

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 2px 8px;

    /* Gray 200 */

    border: 1px solid #E5E7EB;
    border-radius: 4px;
}

h3 {
    margin: 0;
    padding: 0;
}

h5 {
    margin: 0;
    padding: 0;

    color: var(--color-gray-600);
}

p {
    
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
            line-clamp: 3; 
    -webkit-box-orient: vertical;
  }
`);

export default style;

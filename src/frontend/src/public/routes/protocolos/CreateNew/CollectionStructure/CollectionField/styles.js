const style = new CSSStyleSheet();

style.replaceSync(/*css*/`
:host {
    width: 100%;
}

.collection-field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    gap: 24px;
    isolation: isolate;

    background: rgba(0, 0, 0, 0.05);
    /* Green 900 */

    border-left: 4px solid transparent;
    border-radius: 4px;

    transition: 0.3s all ease-in-out;
}

.collection-field:hover {
    border-left: 4px solid #14532D;
}

.collection-field__input-container {
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 24px;
}

input[type="text"] {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 16px;
    gap: 16px;
    
    width: 100%;
    height: 56px;
    
    background: #FFFFFF;
    /* Gray 300 */
    
    border: 1px solid #D1D5DB;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}

input[type="text"]:focus {
    border: 1px solid #14532D;
}

input[type="text"]::placeholder {
    /* Gray 500 */
    color: #6B7280;
}

/* Select */
select {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    gap: 16px;
    
    width: 100%;
    height: 56px;
    
    background: #FFFFFF;
    /* Gray 300 */
    
    border: 1px solid #D1D5DB;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}

select:focus {
    border: 1px solid #14532D;
}

select::placeholder {
    /* Gray 500 */
    color: #6B7280;
}

/* Option */
option {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    gap: 16px;
    
    width: 287.5px;
    height: 56px;
    
    background: #FFFFFF;
    /* Gray 300 */
    
    border: 1px solid #D1D5DB;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}

option:focus {
    border: 1px solid #14532D;
}

option::placeholder {
    /* Gray 500 */
    color: #6B7280;
}

.collection-field__actions-container {
    align-self: flex-end;
        
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 24px;
}

button {
    height: 50px;

    background: none;
    border: none;
    outline: none;

    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 150%;
    /* identical to box height, or 18px */

    text-align: right;

    color: #000000;
}

button:hover {
    cursor: pointer;
}
`);

export default style;

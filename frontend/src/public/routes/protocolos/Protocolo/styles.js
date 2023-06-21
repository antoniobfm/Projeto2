const style = new CSSStyleSheet();

style.replaceSync(/*css*/`
:host {
    height: 100vh;
}
#container {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    padding: 24px;


    height: 100vh;

    background: #FFFFFF;
    border-radius: 5px;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;

    margin-top: 24px;
}

.superior {
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 40px;
}

.superior__header {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

h1 {
    margin: 0;

    color: var(--color-gray-900);
}

.blocos {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 24px;

    background: #ffffff;
    cursor: pointer;
    /* box-shadow: 0px 2px 4px rgba(227, 21, 21, 0.1); */

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 1;
}

.bloco {
    flex: 1;
    width: calc(100%);
    height: 100%;

    background: black;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;

    padding: 32px;

    border-radius: 16px;
}

h2 {
    /* 4xl/bold */

    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 27px;
    /* identical to box height, or 54px */


    color: #FFFFFF;
}

h5 {
    color: var(--color-gray-500);
}

small {
    font-size: 14px;
}

span {
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    color: #FFFFFF;
    text-align: center;
}

#itens {
    width: 100%;
    /* Auto layout */

    display: flex;
    flex-direction: column;
    padding: 0px;
    gap: 24px;

    background: #ffffff;
    cursor: pointer;
    /* box-shadow: 0px 2px 4px rgba(227, 21, 21, 0.1); */
}

.botoes {
    width: 100%;
    padding: 0px;

    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
}

h3 {
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 150%;
    /* identical to box height, or 27px */

    display: flex;
    align-items: flex-end;

    color: var(--color-gray-900);

    margin: 0;
}


.content {
    display: flex;

    flex-direction: column;
}

.selecao {
    width: 100%;
    height: 70px;
    /* Auto layout */

    padding: 0px;
    gap: 16px;

    background: #d7d0d0;
    cursor: pointer;
    box-shadow: 0px 2px 4px rgba(227, 21, 21, 0.1);

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 1;
    margin-bottom: 20px;

    border-radius: 5px;
}

h4 {
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 150%;
    /* identical to box height, or 27px */


    display: flex;
    align-items: center;
    text-align: center;

    /* Gray 900 */

    color: #111827;
}
`);

export default style;

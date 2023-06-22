const style = new CSSStyleSheet();

style.replaceSync(/*css*/`
:host {
  min-width: 500px;
  height: calc(100vh - 24px);
}

dendem-collection-structure {
  width: 100%;
}

dendem-general-information {
  width: 100%;
}

#container {
  height: 100%;

  position: relative;

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  padding: 24px 24px 24px;

  background: #ffffff;
  border-radius: 5px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;

  margin-top: 24px;

  overflow-y: auto;
}

#container::-webkit-scrollbar {
  width: 6px;
}

#container::-webkit-scrollbar-track {
  background: rgb(200, 200, 200);
}

#container::-webkit-scrollbar-thumb {
  background-color: #666666;
  border-radius: 16px;
  border: 2px solid #666666;
}

.superior {
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 40px;
}

h1 {
  color: var(--color-gray-900);
}

.blocos {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
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
  min-width: 150px;
  aspect-ratio: 1/1;

  background: black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  /* padding: 16px; */

  border-radius: 16px;
}

span {
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  color: #ffffff;
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

.create-coletor-button-container {
  width: 100%;

  position: sticky;
  bottom: 0;

}
`);

export default style;

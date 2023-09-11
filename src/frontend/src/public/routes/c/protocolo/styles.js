const styles = new CSSStyleSheet();

styles.replaceSync(/*css*/`

#dashboard {
  width: 100%;
  min-height: 100vh;

  position: relative;

  overflow: hidden;

  background: #FAF2E9;
}

h1 {
  padding-top: 24px;
  padding-left: 24px;
}

#campos {
  display: flex;
  flex-direction: column;

  gap: 24px;

  padding: 24px;
}

#campos button {
  border: none;
  outline: none;

  border-radius: 4px;
  background: var(--color-primary);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);

  padding: 16px;

  color: var(--color-gray-100);
}

.etapa {

}

.etapa .campos-lista {
  display: flex;
  flex-direction: column;

  gap: 16px;
}

.campo {
  display: flex;
  flex-direction: column;

  gap: 8px;
}

.campo label {

}

.campo input {
  border-radius: 4px;
  border: 1px solid var(--gray-300, #D1D5DB);
  background: #FFF;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10);

  padding: 16px;
}

#help {
  position: fixed;

  bottom: 0;
  right: 0;

  width: 48px;
  height: 48px;

  border-radius: 50%;

  background: var(--color-primary);

  margin: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
}

#help span {
  color: var(--color-gray-100);
}

#goBack {
  background: transparent;
  border: none;
  outline: none;

  width: 100%;
  
}
`);

export default styles;

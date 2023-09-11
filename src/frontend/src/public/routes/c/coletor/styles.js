const styles = new CSSStyleSheet();

styles.replaceSync(/*css*/`

#dashboard {
  width: 100%;
  min-height: 100vh;

  position: relative;

  overflow: hidden;

  background: #FAF2E9;
}

#protocolos {
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 16px;
}

.protocolos-lista {
  width: 100%;

  overflow-x: scroll;
  padding: 0 24px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  gap: 24px;
}

.protocolos-lista::-webkit-scrollbar {
  display: none;
}

h2 {
  padding-top: 24px;
  padding-left: 24px;
}

.protocolo {
  width: calc(75vw);
  height: 40vw;

  position: relative;
  flex-shrink: 0;

  border-radius: 16px;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.protocolo::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  border-radius: 16px;

  background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.55) 100%);
}

.protocolo-info {
  position: absolute;
  bottom: 0;
  left: 0;

  padding: 16px;
}

.protocolo-info h3 {
  color: var(--color-gray-100);
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
`);

export default styles;

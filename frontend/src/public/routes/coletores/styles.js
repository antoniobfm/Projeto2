const styles = new CSSStyleSheet();

styles.replaceSync(/*css*/`
#dashboard {
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;

  display: grid;
  grid-template-columns: auto 1fr 1fr;
}
`);

export default styles;

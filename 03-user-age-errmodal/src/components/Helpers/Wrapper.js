// To remove extra divs around multiple root level elements
// - Can create custom Wrapper like below or use
// - <React.Fragment>... </React.Fragment> or
// - <> ... </> (only works in some proj)
const Wrapper = (props) => {
  return props.children;
};

export default Wrapper;

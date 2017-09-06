import React, { PropTypes, Component } from "react";
import chart from "./chart";

class Header extends Component {
  import { composeWithDevTools } from "redux-devtools-extension";

  const composeEnhancers = composeWithDevTools(options);
  const store = createStore(
    reducer,
    /* preloadedState, */ composeEnhancers(
      applyMiddleware(...middleware)
      // other store enhancers if any
    )
  );

export default Header;

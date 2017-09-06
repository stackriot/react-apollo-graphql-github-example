import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import test from "ava";
import reducers from "./reducers";

test("reducers", t => {
  let state;
  state = reducers(undefined, {});
  t.deepEqual(state, {
    apollo: { data: {}, optimistic: [], reducerError: null }
  });
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
import test from "tape";
import reducers from "../../reducers";

test("reducers", t => {
  let state;
  state = reducers(undefined, {});
  t.deepEqual(state, {
    apollo: { data: {}, optimistic: [], reducerError: null }
  });
  t.end();
});

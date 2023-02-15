import { combineReducers } from "redux";

import reducerContent from "./reducerContent";

const reducer = combineReducers({
  content: reducerContent,
  user: null,
});

export default reducer;

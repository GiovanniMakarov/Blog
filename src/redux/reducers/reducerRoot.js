import { combineReducers } from "redux";

import reducerContent from "./reducerContent";
import reducerUser from "./reducerUser";

const reducer = combineReducers({
  content: reducerContent,
  user: reducerUser,
});

export default reducer;

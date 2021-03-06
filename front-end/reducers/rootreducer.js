import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import userSlice from "./user";
import portfolioSlice from "./portfolio";
import qnaSlice from "./qna";
import imageSlice from "./image";
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user: userSlice.reducer,
        portfolio: portfolioSlice.reducer,
        qna: qnaSlice.reducer,
        image: imageSlice.reducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;

import { combineReducers } from "redux";
import userSliceReducer from "../slice/userSlice";
import adminSliceReducer from "../slice/adminSlice";

const rootReducer = combineReducers({
  userSlice: userSliceReducer,
  adminSlice: adminSliceReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import { loginUser } from "./LoginReducer";
import TodoSave from "./Tolist"

const rootReducer = combineReducers({
   TodoSave,loginUser
    
});

export default rootReducer;
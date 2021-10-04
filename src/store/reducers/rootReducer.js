import { combineReducers } from "redux";
import quizCreateReducer from "./quizCreateReducer";
import quizReducer from "./quizReducer";
import authReducer from './authReducer';

export default combineReducers({
    quiz: quizReducer,
    create: quizCreateReducer,
    auth: authReducer,
})
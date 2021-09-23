import {
  QUIZ_CREATE_CLEAN_FORM,
  QUIZ_CREATE_PUSH_QUESTION,
} from "../actions/actionTypes";

const initialState = {
  quiz: [],
};

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case QUIZ_CREATE_PUSH_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.newQestion],
      };
    case QUIZ_CREATE_CLEAN_FORM:
      return {
        ...state,
        quiz: [],
      };
    default:
      return state;
  }
}

import { FETCH_QUIZES_ERROR, FETCH_QUIZES_SUCCESS, FETCH_QUIZ_ERROR, FETCH_QUIZ_START, QUIZ_FINISHED, QUIZ_SET_STATE, FETCH_QUIZES_START, FETCH_QUIZ_SUCCESS, QUIZ_RETRY_STATE_RESET, QUIZ_NEXT_QUESTION } from "../actions/actionTypes";

const initialState = {
  quizes: [],
  loading: true,
  error: null,
  results: {},
  activeQuestion: 0,
  answerState: null,
  isFinished: false,
  quiz: null,
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.quizes,
      };
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case FETCH_QUIZ_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.quiz,
      };
    case FETCH_QUIZ_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case QUIZ_RETRY_STATE_RESET:
      return {
        ...state,
        results: {},
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
      };
    case QUIZ_FINISHED:
      return {
        ...state,
        isFinished: true,
      };
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        activeQuestion: action.activeQuestion + 1,
        answerState: null,
      };
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results
      }

    default:
      return state;
  }
}

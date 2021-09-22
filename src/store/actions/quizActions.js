import axiosQuiz from "../../axios/axios-quiz";
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_ERROR,
  FETCH_QUIZ_START,
  FETCH_QUIZ_SUCCESS,
  QUIZ_RETRY_STATE_RESET,
  QUIZ_NEXT_QUESTION,
  QUIZ_SET_STATE,
} from "./actionTypes";

export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const quizes = [];
      const response = await axiosQuiz.get("quiz.json");
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Quiz #${index + 1}`,
        });
      });
      dispatch(fetchQuizesSuccess(quizes));
    } catch (error) {
      console.log(error);
      dispatch(fetchQuizesError(error));
    }
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  };
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error,
  };
}

export function fetchQuizStart() {
  return {
    type: FETCH_QUIZ_START,
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
}

export function fetchQuizError(error) {
  return {
    type: FETCH_QUIZ_ERROR,
    error,
  };
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY_STATE_RESET,
  };
}

export function fetchQuizById(quizId) {
  return async (dispatch) => {
    dispatch(fetchQuizStart());
    /* console.log("Quiz ID = ", quizId); */
    try {
      /* console.log(`path: ${quizId}.json`) */
      const response = await axiosQuiz.get(`quiz/${quizId}.json`);
      /* console.log(`response: `, response.data); */
      const quiz = response.data;
      dispatch(fetchQuizSuccess(quiz));
    } catch (error) {
      console.log(error);
      dispatch(fetchQuizError(error));
    }
  };
}

export function nextQuestion(activeQuestion) {
  return {
    type: QUIZ_NEXT_QUESTION,
    activeQuestion,
  };
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
}

function isQuizFinished(state) {
  return !state.quiz[state.activeQuestion + 1]
}

export function quizAnswerClick(answerId) {
  return async (dispatch, getState) => {
    const state = getState().quiz
/*     console.log("AnswerId: ", answerId);
    console.log(
      "rightAnswerId: ",
      state.quiz[state.activeQuestion].rightAnswerId
    ); */
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === "success") return;
    }
    const results = state.results;
    const question = state.quiz[state.activeQuestion];
    if (question.rightAnswerId === answerId) {
      if (!results[state.activeQuestion]) {
        results[state.activeQuestion] = "success";
      }
      dispatch(quizSetState({[answerId]: "success"}, state.results))
      const timeout = window.setTimeout(() => {
        console.log("You are right! Next question...");
        if (isQuizFinished(state)) {
          dispatch({
            type: 'QUIZ_FINISHED'
          })
          console.log("No more questions...", state.isFinished);
        } else {
          dispatch(nextQuestion(state.activeQuestion))
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      //if fring answer
      results[state.activeQuestion] = "error";
      dispatch(quizSetState({[answerId]: "error"}, state.results))
      console.log("Wrong answer");
    }
  };
}

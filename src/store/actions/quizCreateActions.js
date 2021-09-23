import { QUIZ_CREATE_CLEAN_FORM, QUIZ_CREATE_PUSH_QUESTION } from "./actionTypes";
import axiosQuiz from "../../axios/axios-quiz";

export function quizCreateCleanForm() {
    return {
        type: QUIZ_CREATE_CLEAN_FORM
    }
}

export function fetchCreatedQuiz(quiz) {
  return async (dispatch) => {
    try {
      const response = await axiosQuiz.post("quiz.json", quiz);
      dispatch(quizCreateCleanForm())
      console.log(response.data); 
    } catch (err) {
      console.log(err);
    }

    /* axios.post('https://react-quiz-cba87-default-rtdb.europe-west1.firebasedatabase.app/quiz.json', this.state.quiz)
            .then(response => {
              console.log(response)
            })
            .catch(error => console.log(error)) */
    return {

    }
  };
}

export function quizCreatePushQuestion(newQestion) {
  return {
    type: QUIZ_CREATE_PUSH_QUESTION,
    newQestion
  };
}

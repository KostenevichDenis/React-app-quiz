import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./QuizCreator.module.css";
import { createControl, validateControl } from "../../form/formFramework";
import { Fragment } from "react/cjs/react.production.min";
import Select from "../../components/UI/Select/Select";
import axios from "../../axios/axios-quiz";

const createFormControls = () => {
  return {
    question: createControl(
      {
        label: "Enter the question",
        errorMessage: `qustion field can't be empty`,
      },
      {
        required: true,
      }
    ),
    option1: createControl(
      {
        label: "variant 1",
        errorMessage: `can't be empty`,
      },
      {
        required: true,
      }
    ),
    option2: createControl(
      {
        label: "variant 2",
        errorMessage: `can't be empty`,
      },
      {
        required: true,
      }
    ),
    option3: createControl(
      {
        label: "variant 3",
        errorMessage: `can't be empty`,
      },
      {
        required: true,
      }
    ),
    option4: createControl(
      {
        label: "variant 4",
        errorMessage: `can't be empty`,
      },
      {
        required: true,
      }
    ),
  };
};
export default class QuizCreator extends Component {
  state = {
    quiz: [],
    formControls: createFormControls(),
    rightAnswerId: 1,
    isFormValid: false,
  };

  submitHandler(event) {
    event.preventDefault();
  }

  createQuizHandler = async (event) => {
    event.preventDefault();
    console.log(this.state.quiz);

    try {
      const response = await axios.post('quiz.json', this.state.quiz)
      this.setState({
        quiz: [],
        formControls: createFormControls(),
        rightAnswerId: 1,
        isFormValid: false
      })
      console.log(response.data)
  } catch (err) {
    console.log(err)
  }

    /* axios.post('https://react-quiz-cba87-default-rtdb.europe-west1.firebasedatabase.app/quiz.json', this.state.quiz)
    .then(response => {
      console.log(response)
    })
    .catch(error => console.log(error)) */

    
  };

  onChangeHandler(event, controlName) {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid,
    });
  }

  SelectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value,
    });
  };

  addQuestionHandler = (event) => {
    event.preventDefault();
    const formData = this.state.formControls;
    console.log(this.state.formControls);
    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;

    const quizInput = {
      id: index,
      question: formData.question.value,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: formData.option1.value, id: formData.option1.id },
        { text: formData.option2.value, id: formData.option2.id },
        { text: formData.option3.value, id: formData.option3.id },
        { text: formData.option4.value, id: formData.option4.id }
      ],
    };
    quiz.push(quizInput);
    console.log(`this state quiz ${this.state.quiz}`);
    this.setState({
      quiz,
      formControls: createFormControls(),
      rightAnswerId: 1,
      isFormValid: false,
    });
    /* console.log("quizInput state: ", quizInput)   */
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Fragment key={controlName + index}>
          <Input
            key={controlName + index}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            errorMessage={control.errorMessage}
            shouldValidate={!!control.validation}
            onChange={(event) => this.onChangeHandler(event, controlName)}
          />
          {index === 0 ? <hr /> : null}
        </Fragment>
      );
    });
  }

  render() {
    /* console.log("form controls: ", this.state.formControls); */
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Quiz Creator</h1>

          <form onSubmit={this.submitHandler}>
            {this.renderInputs()}
            <Select
              value={this.state.rightAnswerId}
              onChange={this.SelectChangeHandler}
              label="Choose correct answer"
              text=""
              options={[
                { text: "1", value: 1 },
                { text: "2", value: 2 },
                { text: "3", value: 3 },
                { text: "4", value: 4 },
              ]}
            />
            <Button
              disabled={!this.state.isFormValid}
              type="primary"
              onClick={this.addQuestionHandler}
            >
              Add question
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.length === 0}
            >
              Create Quiz
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

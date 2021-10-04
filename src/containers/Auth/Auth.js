import React, { Component } from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { validateControl } from "../../form/formFramework";
import { connect } from "react-redux";
import { auth } from "../../store/actions/authActions";
class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Incorrect email adress",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Password",
        errorMessage: "Incorrect password",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  onChangeHandler(event, controlName) {
    /* console.log ( `${controlName} event target value `,event.target.value) */

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

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  loginHandler = () => {
    this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, true)
    /* try {
      const authData = {
        email: this.state.formControls.email.value,
        password: this.state.formControls.password.value,
        returnSecureToken: true,
      };
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqc1HF6YVaxiaOgV81BQCQYr07QOhq7ho",
        authData
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    } */
  };

  registerHandler = () => {
    this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, false)
    /* try {
      const authData = {
        email: this.state.formControls.email.value,
        password: this.state.formControls.password.value,
        returnSecureToken: true,
      };
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqc1HF6YVaxiaOgV81BQCQYr07QOhq7ho",
        authData
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    } */
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Auth</h1>

          <form className={classes.AuthForm} onSubmit={this.submitHandler}>
            {this.renderInputs()}
            {/* <Input label="Email" />
            <Input label="Password" errorMessage={"TEST"} /> */}

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Enter
            </Button>

            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

/* function mapStateToProps(state) {
  return {

  };
} */

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  };
}

export default connect(null, mapDispatchToProps)(Auth);

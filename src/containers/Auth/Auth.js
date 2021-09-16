import React, { Component } from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
export default class Auth extends Component {
  state = {
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
          minLength: 6
        },
      },
    },
  };

  validateEmail (email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return  re.test(String(email).toLowerCase());
  }

  validateControl(value, validation) {
    if (!validation) {
        return true
    }

    let isValid = true

    if(validation.required) {
        isValid = value.trim() !== '' && isValid
    }
    if(validation.email){
        isValid = this.validateEmail(value)
        }
    
    if(validation.minLength) {
        isValid = value.trim().length >= validation.minLength && isValid
    }
    return isValid
  }
 
  onChangeHandler(event, controlName) {
      /* console.log ( `${controlName} event target value `,event.target.value) */

      const formControls = {...this.state.formControls}
      const control = { ...formControls[controlName] }

      control.value = event.target.value
      control.touched = true
      control.valid = this.validateControl(control.value, control.validation)
      formControls[controlName] = control

      this.setState ( {
          formControls 
      } )
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
        const control = this.state.formControls[controlName]
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
                onChange={event => this.onChangeHandler(event, controlName)}
            />
        )
    })
  }

  loginHandler = () => {};

  registerHandler = () => {};

  submitHandler = (event) => {
    event.preventDefault();
  };

  render() {



    return (
      <div className={classes.Auth}>
        <div>
          <h1>Auth</h1>

          <form className={classes.AuthForm} onSubmit={this.submitHandler}>
            
            { this.renderInputs() }
            {/* <Input label="Email" />
            <Input label="Password" errorMessage={"TEST"} /> */}
            
            <Button type="success" onClick={this.loginHandler}>
              Enter
            </Button>

            <Button type="primary" onClick={this.registerHandler}>
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

import { Redirect, Route, Switch, withRouter } from "react-router";
import Quiz from "./containers/Quiz/Quiz";
import Layout from "./hoc/Layout/Layout";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import { connect } from "react-redux";
import { autoLogin } from './store/actions/authActions';
import { useEffect } from "react";

function App(props) {
  useEffect(() => {
    props.autoLogin()
  })


  let routes = (
    <Switch>
      <Route path={"/auth"} component={Auth} />
      <Route path={"/quiz/:id"} component={Quiz} />
      <Route path={"/"} exact component={QuizList} />
      <Redirect to={'/'} />
    </Switch>
  );
  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path={"/quiz-crator"} component={QuizCreator} />
        <Route path={"/quiz/:id"} component={Quiz} />
        <Route path={"/"} exact component={QuizList} />
        <Redirect to={'/'} />
      </Switch>
    );
  }

  return <Layout>{routes}</Layout>;
}

function mapStateToProps(state) {
  return {
    isAuth: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

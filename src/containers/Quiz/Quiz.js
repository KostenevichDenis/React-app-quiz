import classes from './Quiz.module.css'
import React, {Component} from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux';
import { fetchQuizById, retryQuiz, quizAnswerClick } from '../../store/actions/quizActions';
class Quiz extends Component {

    /* onAnswerClickHandler = (answerId) => {
        console.log('AnswerId: ', answerId)
        console.log('rightAnswerId: ', this.state.quiz[this.state.activeQuestion].rigthAnswerId)
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') return
        }

        const results = this.state.results
        const question = this.state.quiz[this.state.activeQuestion]
        if (question.rightAnswerId === answerId){
            if ( !results[this.state.activeQuestion]) {
                results[this.state.activeQuestion] = 'success'
            }
            this.setState({
                answerState: {
                    [answerId]: 'success',
                    results
                }
            })
            const timeout = window.setTimeout(() => {
                console.log('You are right! Next question...')
                if (this.isQuizFinished()) 
                    {
                        this.setState({
                            isFinished: true
                        })
                        console.log('No more questions...', this.state.isFinished)
                    } 
                
                else
                    {
                        this.setState({
                            activeQuestion: this.state.activeQuestion + 1,
                            answerState: null,
                        }) 
                    }
                window.clearTimeout(timeout)
            }, 1000)

            
        } else {                                 //if fring answer
            results[this.state.activeQuestion] = 'error'
            this.setState({
                answerState: {
                    [answerId]: 'error',
                    results
                }
            })
            console.log('Wrong answer')
        }
    }

    isQuizFinished () {
        return this.state.quiz[this.state.activeQuestion + 1] ? false : true
    }
    
    retryHandler = () => {
        this.setState({
            results: {},
            activeQuestion: 0,
            answerState: null,
            isFinished: false            
        })
    } */

    componentDidMount = async () => {
        this.props.fetchQuizById(this.props.match.params.id)
        /* console.log('Quiz ID = ', this.props.match.params.id)
        const quizId = this.props.match.params.id
        try {
            console.log(`path: ${quizId}.json`)
            const response = await axios.get(`quiz/${quizId}.json`)
            console.log(`response: `, response.data)
            const quiz = response.data
            this.setState({
                quiz,
                loading: false
            })
            console.dir(this.state.quiz[this.state.activeQuestion].answers)
            console.log(`state`, this.state.answerState)
            
        } catch (error) {
            console.log(error)
        } */
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Give an answer</h1>

                    {
                        this.props.loading || !this.props.quiz
                        ? <Loader /> 
                        : this.props.isFinished 
                        ? 
                            <FinishedQuiz 
                                results={this.props.results}
                                quiz={this.props.quiz}
                                retryHandler={this.props.retryHandler}
                            /> 
                        : 
                            <ActiveQuiz 
                                question={this.props.quiz[this.props.activeQuestion].question}
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                onAnswerClick={this.props.quizAnswerClick}
                                quizLength={this.props.quiz.length}
                                answerNumber={this.props.activeQuestion}
                                state={this.props.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToPtops(state) {
    return {
        activeQuestion: state.quiz.activeQuestion,
        quiz: state.quiz.quiz,
        answerState: state.quiz.answerState,
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        retryHandler: () => dispatch(retryQuiz()),
        fetchQuizById: (quizId) => dispatch(fetchQuizById(quizId)),
        quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)) 
    }
}

export default connect(mapStateToPtops, mapDispatchToProps)(Quiz)
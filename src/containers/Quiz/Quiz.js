import classes from './Quiz.module.css'
import React, {Component} from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from "axios";

class Quiz extends Component {
    state = {
        results: {},
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        quiz: [
            /* {
                id: 1,
                question: 'Who is the most handsome?',
                rightAnswerId: 4,
                answers: [
                    {text: 'Harry Potter', id: 1},
                    {text: 'Freddy', id: 2},
                    {text: 'Micheal', id: 3},
                    {text: 'Nick', id: 4},
                ]
            },
            {
                id: 2,
                question: 'Where you from?',
                rightAnswerId: 2,
                answers: [
                    {text: 'Minsk', id: 1},
                    {text: 'Warsaw', id: 2},
                    {text: 'Moscow', id: 3},
                    {text: 'Kiev', id: 4},
                ]
            },
            {
                id: 3,
                question: 'Where you from?',
                rightAnswerId: 2,
                answers: [
                    {text: 'Minsk', id: 1},
                    {text: 'Warsaw', id: 2},
                    {text: 'Moscow', id: 3},
                    {text: 'Kiev', id: 4},
                ]
            } */
        ]
    }

    qz = null

    onAnswerClickHandler = (answerId) => {
        /* console.log('AnswerId: ', answerId) */
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
    }

    componentDidMount = async () => {
        console.log('Quiz ID = ', this.props.match.params.id)
        const quizId = this.props.match.params.id
        try {
            const response = await axios.get(`https://react-quiz-cba87-default-rtdb.europe-west1.firebasedatabase.app/quiz/${quizId}.json`)
            console.log(`response: `, response.data)
            const quiz = this.state.quiz
            response.data.map( (q) => {
                quiz.push(q)
            } )
            this.setState({
                quiz
            })
            console.dir(this.state.quiz[this.state.activeQuestion])

            this.qz = (
                    this.state.isFinished 
                            ? 
                                <FinishedQuiz 
                                    results={this.state.results}
                                    quiz={this.state.quiz}
                                    retryHandler={this.retryHandler}
                                /> 
                            : 
                                <ActiveQuiz 
                                    question={this.state.quiz[this.state.activeQuestion].question}
                                    answers={this.state.quiz[this.state.activeQuestion].answers}
                                    onAnswerClick={this.onAnswerClickHandler}
                                    quizLength={this.state.quiz.length}
                                    answerNumber={this.state.activeQuestion}
                                    state={this.state.answerState}
                                />
                )
            
        } catch (error) {
            console.log(error)
        }

        
        
    }

    render() {
        
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Give an answer</h1>

                    {
                        this.qz
                    }

                    
                </div>
            </div>
        )
    }
}



export default Quiz
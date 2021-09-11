import classes from './Quiz.module.css'
import React, {Component} from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
    state = {
        results: {},
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        quiz: [
            {
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
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        const results = this.state.results
        /* console.log('AnswerId: ', answerId) */
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') return
        }
        
        const question = this.state.quiz[this.state.activeQuestion]
        if (question.rightAnswerId === answerId){
            if ( !results[answerId]) {
                results[answerId] = 'success'
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
                            answerState: null
                        }) 
                    }
                window.clearTimeout(timeout)
            }, 1000)

            
        } else {
            results[answerId] = 'error'
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
    

    render() {
        
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Give an answer</h1>

                    {
                        this.state.isFinished 
                        ? 
                            <FinishedQuiz 
                                results={this.state.results}
                                quiz={this.state.quiz}
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
                    }

                    
                </div>
            </div>
        )
    }
}



export default Quiz
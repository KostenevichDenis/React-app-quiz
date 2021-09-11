import React from "react";
import classes from './FinishedQuiz.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, fa, faCheckCircle, faCoffee, fas, faTimes } from '@fortawesome/free-solid-svg-icons'

const FinishedQuiz = props => {
    
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    console.log(props.results[0])
                    return (
                        <li key={index} className>
                            <strong>{index+1}. </strong>
                            {quizItem.quiestion}
                            <FontAwesomeIcon className={classes.props.results[quizItem.id]} icon={faCheck} style={{paddingLeft:5}}/>
                        </li>
                    )
                })}

                {/* <li>
                    <strong>1. </strong>
                    Question text 
                    <FontAwesomeIcon className={classes.success} icon={faCheck} style={{paddingLeft:5}}/>
                </li>
                <li>
                    <strong>2. </strong>
                    Question text 
                    <FontAwesomeIcon className={classes.error} icon={faTimes} style={{paddingLeft:5}}/>
                </li> */}
            </ul>

            <p>Right answers 1 from 2</p>

            <div>
                <button>Retry</button>
            </div>
        </div>
    )
}

export default FinishedQuiz
import React from "react";
import classes from './FinishedQuiz.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";

const FinishedQuiz = props => {
    const rightAnswersCount = Object.values(props.results).filter(el => el === 'success').length
/*     console.log('right answers: ', rightAnswersCount) */
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    /* console.log('results: ', props.results) */
                    const cls = []
                    cls.push()
                    props.results[quizItem.id-1] === 'success' 
                    ?
                        (
                            cls.push('success')

                        ) 
                    : 
                        (
                            cls.push('error')

                        )
                    /* console.log('cls: ', cls) */
                    return (
                        <li key={index}>
                            <strong>{index+1}. </strong>
                            {quizItem.question}
                            {
                                props.results[quizItem.id-1] === 'success' 
                                ?
                                    (
                                        <FontAwesomeIcon className={classes[cls[0]]} icon={faCheck} style={{paddingLeft:5}}/>
                                        
                                    ) 
                                : 
                                    (
                                        <FontAwesomeIcon className={classes[cls[0]]} icon={faTimes} style={{paddingLeft:5}}/>
            
                                    )
                            }
                            
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

            <p>Right answers {rightAnswersCount} from {props.quiz.length}</p>

            <div>
                <Button onClick={props.retryHandler} type="primary">Retry</Button>
                <Link to={'/'}>
                    <Button onClick={props.retryHandler} type="success">Go to list of tests</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz
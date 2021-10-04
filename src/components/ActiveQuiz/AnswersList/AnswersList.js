import classes from './AnswersList.module.css'
import React from 'react'
import AnswerItem from './AnswerItem/AnswerItem'


const AnswersList = props => {
    /* console.log('answers ', props.answers[0]) */
    return (
        <ul className={classes.AnswersList}>
            { props.answers.map((answer, index) => {
/*                 console.log('map el index', answer, index) */
                answer.id = index + 1
                return (
                    <AnswerItem
                    key={index}
                    answer={answer}
                    onAnswerClick={props.onAnswerClick}
                    state={props.state ? props.state[answer.id] : null}
                    />
                )
                
            }) }

        </ul>
    )
    }

export default AnswersList
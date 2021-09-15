import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './QuizList.module.css'

export default class QuizList extends Component {

    renderQuizes () {
        return [1,2,3].map((quiz, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={'/quiz/'+ quiz}>
                        Quiz {quiz}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        return (
            <div className={classes.gridContainer}>
                <div className={classes.QuizList}>
                    <h1>List of Quizes</h1>

                    <ul>
                        {this.renderQuizes()}
                    </ul>
                </div>
            </div>
        )
    }
}

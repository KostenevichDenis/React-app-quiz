import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './QuizList.module.css'
import axios from 'axios'

export default class QuizList extends Component {

    state = {
        quizes: []
    }

    renderQuizes () {
        return this.state.quizes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink
                        to={'/quiz/'+ quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount = async () => {
        try {
            const quizes = []
            const response = await axios.get('https://react-quiz-cba87-default-rtdb.europe-west1.firebasedatabase.app/quiz.json')
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Quiz #${index + 1}`
                })
            })
            this.setState({
                quizes
            })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
        

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

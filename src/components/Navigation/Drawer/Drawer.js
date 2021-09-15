import React, { Component } from "react";
import classes from "./Drawer.module.css"
import Backdrop from "../../UI/Backdrop/Backdrop";
import { NavLink } from "react-router-dom";

const links = [
    {
        to: '/',
        label: 'Quiz List',
        exact: true
    }, 
    {
        to: '/quiz-crator',
        label: 'Create Quiz',
        exact: false
    }, 
    {
        to: '/auth',
        label: 'Authentication',
        exact: false
    }
]

class Drawer extends Component {

    renderLinks() {
        return (
            links.map( (link, index) => {
                return (
                    <li key={index}>
                        <NavLink
                            to={link.to}
                            exact={link.exact}
                            activeClassName={classes.active}
                            onClick={this.props.onClick}
                            >
                                {link.label}
                        </NavLink>
                    </li>
                )
            } )
        )
    }

    render () {
        const cls = [classes.Drawer]
        if (!this.props.isOpen) {
            cls.push(classes.close)
        }


        return (
            <React.Fragment>
                {this.props.isOpen? <Backdrop onClick={this.props.onClick}/> : null}
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>

                </nav>
            </React.Fragment>
        )
    }
}

export default Drawer
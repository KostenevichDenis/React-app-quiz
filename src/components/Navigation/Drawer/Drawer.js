import React, { Component } from "react";
import classes from "./Drawer.module.css"
import Backdrop from "../../UI/Backdrop/Backdrop";
import { NavLink } from "react-router-dom";
import LogoutButton from "../../UI/LogoutButton/LogoutButton";


const links = [
    {
        to: '/auth',
        label: 'Authentication',
        exact: false
    },
    {
        to: '/',
        label: 'Quiz List',
        exact: true
    }, 
]

const authedLinks = [
    {
        to: '/',
        label: 'Quiz List',
        exact: true
    }, 
    {
        to: '/quiz-crator',
        label: 'Create Quiz',
        exact: false
    }
]

class Drawer extends Component {

    renderLinks() {
        let linksToRender
        this.props.isAuth ? linksToRender = authedLinks : linksToRender = links
        return (
            linksToRender.map( (link, index) => {
                /* console.log(this.props.isAuth) */
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
            })
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
                    {
                        this.props.isAuth ? <LogoutButton isAuth={this.props.isAuth} /> : null
                    }
                    
                </nav>
            </React.Fragment>
        )
    }
}

export default Drawer
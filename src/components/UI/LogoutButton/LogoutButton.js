import React, { Component } from 'react'
import { connect } from 'react-redux';
import {logout} from '../../../store/actions/authActions'
import Button from '../Button/Button';
import { withRouter } from 'react-router';

class Logout extends Component {
    
    componentWillUnmount() {
        this.props.history.push('/')
        console.log('history', this.props.history)
    }

    render() {
        return (
            <Button
                type='primary'
                onClick={this.props.logout}
            >
                Logout
            </Button>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Logout))

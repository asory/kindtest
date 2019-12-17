import React, { Component } from 'react';
import { Button, Input } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Container from '../../Components/Container';
import API from '../../api';
import Axios from 'axios';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoading: true,
        };
    }
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitHandler = e => {
        e.preventDefault();
        Axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(resp => {
                resp.filter( user => user.username === this.state.username)
                console.log('1', resp.data);
            })
            .then(res => {
                res.filter(
                    user => console.log('inside' + user),

                /*     user.username === this.state.username &&
                        user.email === this.state.password */
                );
                console.log('2' + res.data);
            })
            .then(response => {
                console.log('LOGIN RESPONSE' + response);
                alert('Sesión iniciada');
                this.props.userHasAuthenticated(true);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('userId', response.data.id);

                this.setState({
                    isLoading: false,
                });
            })
            .catch(error => {
                alert('Wrong Data' + error);
                this.setState({ isLoading: false });
            });
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/PostList" props={this.state} />;
        } else {
            return (
                <Container>
                    <div>
                        <h1>UMBRELLACORP</h1>
                    </div>
                    <div>
                        <form onSubmit={this.submitHandler}>
                            <Input
                                name="username"
                                type="text"
                                color="primary"
                                placeholder="Username"
                                onChange={this.changeHandler}
                            ></Input>
                            <br />
                            <Input
                                name="password"
                                type="email"
                                color="primary"
                                placeholder="Password"
                                onChange={this.changeHandler}
                            ></Input>
                            <br />

                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={!this.validateForm()}
                            >
                                Sign IN
                            </Button>
                        </form>
                    </div>
                </Container>
            );
        }
    }
}

Main.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
};

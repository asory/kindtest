import React, { Component } from 'react';
import axios from 'axios';
import { Button, Input, InputAdornment } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Container from '../../Components/Container';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitHandler = e => {
        e.preventDefault();
        axios
            .put(
                'https://jsonplaceholder.typicode.com/users',
                {
                    username: this.state.username,
                },
                {
                    headers: {
                        app: 'APP_BCK',
                        password: this.state.password,
                    },
                }
            )
            .then(response => {
                alert('Sesión iniciada');
                this.props.userHasAuthenticated(true);
                localStorage.setItem('username', response.data.username);
                this.setState({
                    isLoading: false,
                });
            })
            .catch(error => {
                alert('Datos Errados' + error);
                this.setState({ isLoading: false });
            });
    };

    render() {
        if (this.props.isAuthenticated) {
           return <Redirect to="/PostList" props={this.props} />;
         } else {
            return (
                <Container>
                    <h1>UMBRELLACORP</h1>

                    <form onSubmit={this.submitHandler}>
                        <Input
                            name="username"
                            type="text"
                            color="primary"
                            placeholder="Sign in with email"
                            onChange={this.changeHandler}
                            startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                        ></Input>
                        <br />
                        <Input
                            name="password"
                            type="password"
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
                            LOGIN
                        </Button>
                    </form>
                </Container>
            );
        }
    }
}

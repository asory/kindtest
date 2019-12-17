import React, { Component } from 'react';
import { Button, Input } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Container from '../../Components/Container';
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
                let user = resp.data.find(
                    object => object['username'] === this.state.username
                );
                console.log('is there', user);

                let isValidPass = user.email === this.state.password;
                if (isValidPass) {
                    alert('Sesión iniciada');
                    this.props.userHasAuthenticated(true);
                    localStorage.setItem('username', user.username);
                    localStorage.setItem('userId', user.id);
                    localStorage.setItem('user', user);
                    console.log('localstorage', localStorage.getItem('user'));
                    this.setState({
                        isLoading: false,
                    });
                }
            })
            .catch(error => {
                alert('Wrong Data' + error);
                this.setState({ isLoading: false });
            });
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/post" props={this.props} />;
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

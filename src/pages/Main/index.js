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
                    alert('WELCOME BACK');
                    this.props.userHasAuthenticated(true);
                    localStorage.setItem('username', user.username);
                    localStorage.setItem('userId', user.id);
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
                        <h1 style={{ padding: '40px' }}> UMBRELLACORP</h1>

                        <form onSubmit={this.submitHandler} display="flex">
                            <Input
                                name="username"
                                type="text"
                                color="primary"
                                placeholder="Username"
                                onChange={this.changeHandler}
                                fullWidth={true}
                                style={{ margin:"15px"}}

                            ></Input>
                            <br />
                            <Input
                                name="password"
                                type="email"
                                color="primary"
                                placeholder="Password"
                                onChange={this.changeHandler}
                                fullWidth={true}
                                style={{ margin:"15px"}}
                            ></Input>
                            <br />

                            <Button
                                alignSelf="center"
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={!this.validateForm()}
                                style={{marginLeft:"40%", marginTop:"5%"}}
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

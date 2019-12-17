import React, { Component } from "react";
import Routes from './routes';
import GlobalStyle from './styles/global';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
        };
    }

    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
      };
    
      handleLogout= event => {
        this.userHasAuthenticated(false);
        this.localStorage.clear();
      };
    
    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated,
            handleLogout: this.handleLogout,
        };
        return (
            <div>
                <Routes childProps={childProps}/>
                <GlobalStyle />
            </div>
        );
    }
}

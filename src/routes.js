import React from 'react';
import {BrowserRouter, Switch } from 'react-router-dom';
import CustomRoute from './Components/CustomRoute';
import Main from './pages/Main';
import PostList from './pages/PostList';

export default ({ childProps }) => (
    <BrowserRouter>
        <Switch>
            <CustomRoute path="/" exact component={Main} props={childProps} />
            <CustomRoute
                path="/post"
                exact
                component={PostList}
                props={childProps}
            />
        </Switch>
    </BrowserRouter>
);

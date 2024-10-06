import React from "react";
import Login from '../Login'
import NoMatch from '../404'
import Flow from '../Flow'
import PrivateRoute from '../PrivateRoute'

import {
    Switch,
    Route,
} from "react-router-dom"

const Routes = () => (
    <Switch>

        <Route exact path={['/login', '/']}>
            <Login />
        </Route>

        <PrivateRoute exact path="/home">
            <Flow />
        </PrivateRoute>

        <Route path="*">
            <NoMatch />
        </Route>
    </Switch>
);

export default Routes
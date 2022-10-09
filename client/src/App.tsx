import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { getHistory } from './application/history';
import Layout from './presentation/layout';
import { router } from './router';
import 'antd/dist/antd.min.css';

const App = () => (
    <Router history={getHistory()}>
        <Switch>
            {router.map((item) => {
                const { component, ...reset } = item;
                return (
                    <Route {...reset} render={() => {
                        return <Layout component={component} />
                    }} />
                )
            })}
        </Switch>
    </Router>
)

export default App;

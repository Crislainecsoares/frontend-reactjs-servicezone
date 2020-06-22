import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Mapa from './pages/Mapa';
import Contato from './pages/Contato';


ReactDOM.render(
    (
        <Router>
            <App>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/mapa" component={Mapa} />
                    <Route path="/contato" component={Contato} />
                </Switch>
            </App>
        </Router>
    ),
    document.getElementById('root')
);


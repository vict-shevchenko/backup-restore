import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/manage" component={App}>
                <Route path="/manage/credentials/:type" component={App} />
            </Route>
        </Route>
    </Router>,
  document.body.appendChild(document.createElement('div'))
);

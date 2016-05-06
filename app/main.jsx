import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

//import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import reducers from './reducers'

import App from './components/App.jsx';

let store = createStore(reducers);

ReactDOM.render(
    /*<Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/manage" component={App}>
                <Route path="/manage/credentials/:type" component={App} />
            </Route>
        </Route>
    </Router>,*/


    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('content1')
);

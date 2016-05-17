import React from 'react';
import ReactDOM from 'react-dom';

import { compose, createStore, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

//import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import reducers from './reducers'

import App from './components/App.jsx';

let store = createStore(reducers, {}, compose(
  applyMiddleware(ReduxThunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

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

import React, { useEffect } from 'react';
import './index.less';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import { routes } from '@/route/index';
import { Provider } from 'react-redux';
import store from '@/store/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className="app-container">
            <div className="right">
              <Router>
                <Switch>
                  {routes.map((route) => {
                    return <Route {...route} />;
                  })}
                </Switch>
              </Router>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

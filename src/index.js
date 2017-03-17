import 'regenerator-runtime/runtime';
import 'antd/dist/antd.css';
import React from 'react';
import { DatePicker } from 'antd';
import dva, { connect } from 'dva';
import { Router, Route } from 'dva/router';


// 1. Initialize
const app = dva();

// 2. Model
app.model({
  namespace: 'app',
  state: 0,
  reducers: {
    add(count) { return count + 1; },
    minus(count) { return count - 1; },
  },
  effects : {
    *startup(action, {call, put}){
        yield put({type : 'count/minus'})
    }
  }
});




// 3. View
const App = connect(({ count }) => ({
  count,
}))((props) => {
  return (
    <div>
      <h2>{ props.count }</h2>
      <button key="add" onClick={() => { props.dispatch({type: 'app/add' }); }}>+</button>
      <button key="minus" onClick={() => { props.dispatch({type: 'app/minus' }); }}>-</button>
    </div>
  );
});

// 4. Router
app.router(({ history }) => {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  );
});

// 5. Start
app.start('#root');

console.log(app._store);
app._store.dispatch({
  type : 'app/startup'
})
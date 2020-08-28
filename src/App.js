import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import  Login from './Containers/Login';
import Routes from './Utils/Routes';
import TransactionTable from "./Components/TransactionTable";

function App() {

  return (
      <BrowserRouter>
        <Switch>
          <Route component={Login} exact path={Routes.Login} />
          <Route component={TransactionTable} exact path={Routes.TransactionTable} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;

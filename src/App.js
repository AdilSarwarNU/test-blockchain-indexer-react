import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import  Login from './Containers/Login';
import Routes from './Utils/Routes';
import TransactionTable from "./Components/TransactionTable";
import Comments from "./Components/Comments";
import TransactionDetails from "./Components/TransactionDetail";

function App() {

  return (
      <BrowserRouter>
        <Switch>
          <Route component={Login} exact path={Routes.Login} />
          <Route component={TransactionTable} exact path={Routes.TransactionTable} />
          {/*<Route component={Comments} exact path={Routes.Comments} />*/}
          <Route component={TransactionDetails} exact path={Routes.TransactionDetails} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;

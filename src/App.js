import React, {useContext} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import  Login from './Containers/Login';
import Routes from './Utils/Routes';
import Transactions from "./Containers/Transactions";
import TransactionDetails from "./Containers/Transactions/Details";
import Snackbar from "@material-ui/core/Snackbar";
import {AppContext} from "./Contexts/AppContext";

function App() {
    const context = useContext(AppContext);
  return (
      <BrowserRouter>
        <Switch>
          <Route component={Login} exact path={Routes.Login} />
          <Route component={Transactions} exact path={Routes.Transactions} />
          <Route component={TransactionDetails} exact path={Routes.TransactionDetails} />
        </Switch>
          <Snackbar
              className={{snackbar: { zIndex: 50000000 }}}
              open={context.toggle}
              onClose={() => context.setToggle(false)}
              onClosing={() => context.setToggle(false)}
              message={context.message}
              leading={false}
              timeoutMs={5000} />
      </BrowserRouter>
  );
}

export default App;

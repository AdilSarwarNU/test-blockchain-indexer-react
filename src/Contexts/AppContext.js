import React, {useState} from 'react';

const AppContext = React.createContext({});

const AppContextProvider = (props) => {
  const [message, setMessage] = useState(null);
  const [isError, setError] = useState(null);
  const [toggle, setToggle] = useState(false);

  const showMessage = (message, {error = false} = {}) => {
    setMessage(message);
    setError(error);
    setToggle(!toggle);
  };

  return (
    <AppContext.Provider value={{
      message,
      showMessage,
      setToggle,
      toggle
    }}>
      {props.children}
    </AppContext.Provider>
  )
};

export {
  AppContext,
  AppContextProvider
};

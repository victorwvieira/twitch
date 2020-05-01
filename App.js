import React, { useState } from 'react';
import { Alert } from 'react-native'
import Home from './src/pages/Home'
import { LoadingContext, ErrorAlertContext } from './src/context'


const App = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <ErrorAlertContext.Provider value={{ setError }}>
        <Home />
        {
          error &&
          Alert.alert(
            "Lamentamos...",
            "Ocorreu um erro, por favor, altere os parametros e tente novamente.",
            [
              { text: "OK", onPress: () => setError(false) }
            ],
            { cancelable: false }
          )
        }
      </ErrorAlertContext.Provider>
    </LoadingContext.Provider>
  );
};

export default App;

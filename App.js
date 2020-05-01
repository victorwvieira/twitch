import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native'
import Home from './src/pages/Home'
import { LoadingContext, ErrorAlertContext } from './src/context'


const App = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (error) {
      Alert.alert(
        "Ops...",
        "Something is wrong, please, modify the parameters and try again.",
        [
          { text: "OK", onPress: () => setError(false) }
        ],
        { cancelable: false }
      )
    }
  }, [error])

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <ErrorAlertContext.Provider value={{ setError }}>
        <Home />
      </ErrorAlertContext.Provider>
    </LoadingContext.Provider>
  );
};

export default App;

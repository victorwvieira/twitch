import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native'
import Home from './src/pages/Home'
import Player from './src/pages/Player'
import { LoadingContext, ErrorAlertContext } from './src/context'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (error) {
      Alert.alert(
        "Ops...",
        "Something is wrong, please, modify the parameters and try again.",
        [
          {
            text: "OK", onPress: () => setError(false)
          }
        ],
        { cancelable: false }
      )
    }
  }, [error])

  return (
    <NavigationContainer>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <ErrorAlertContext.Provider value={{ setError }}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{
              title: 'Twitch Blip',
              headerStyle: {
                backgroundColor: '#653b7d',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              }
            }} />
            <Stack.Screen name="Player" component={Player} options={{
              title: 'Player',
              headerStyle: {
                backgroundColor: '#653b7d',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              }
            }} />
          </Stack.Navigator>
        </ErrorAlertContext.Provider>
      </LoadingContext.Provider>
    </NavigationContainer >
  );
};

export default App;

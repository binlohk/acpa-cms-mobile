import React, { useContext, useMemo, useReducer, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import LoginScreen from './screens/LoginScreen';
import UserScreen from './screens/UserScreen';

/**navigation */
const Stack = createStackNavigator();

/**storage */
import * as SecureStore from 'expo-secure-store';

/**context */
import { AuthContext } from './contexts/authContext';

/**API */
import axios from 'axios';

/**if loading add spinner */

function App() {
  /**reducers */
  const initialLoginState = {
    isLoading: true,
    name: null,
    email: null,
    token: null,
  };


  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          token: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          name: action.name,
          email: action.email,
          token: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          name: null,
          email: null,
          token: null,
          isLoading: false,
        };
      default:
        throw new Error();
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  /**useContext */
  const authContext = useMemo(() => ({
    logIn: async (email, password) => {
      /**make axios call */
      try {
        const response = await axios.post(`http://192.168.0.204:1337/auth/local`, {
          identifier: email,
          password: password
        })
        // console.log(response.data.jwt, 'respo')
        // console.log(response.data.user, 'user')
        /**handling user info */
        await SecureStore.setItemAsync('name', response.data.user.username);
        await SecureStore.setItemAsync('email', response.data.user.email);
        await SecureStore.setItemAsync('token', response.data.jwt);

        dispatch({ type: 'LOGIN', name: response.data.user.username, email: response.data.user.email, token: response.data.jwt });
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', token);
    },
    logOut: async () => {
      try {
        await SecureStore.deleteItemAsync('name');
        await SecureStore.deleteItemAsync('email');
        await SecureStore.deleteItemAsync('token');
        dispatch({ type: 'LOGOUT' });
        // console.log('logged out')
        // console.log('after logout user token: ', loginState.token);
      } catch (e) {
        console.log(e);
      }
    },
  }), []);

  /**  check if logged in or not */
  useEffect(() => {
    const fetchUser = async () => {
      // setIsLoading(false);
      let token;
      try {
        //get user informat
        token = await SecureStore.getItemAsync('token')
        // console.log('user token: ', loginState.token);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: token });
    }
    fetchUser()
  }, [loginState.token]);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {
            loginState.token === null ? (
              <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
            ) : (
              <Stack.Screen name="User" component={UserScreen} options={{ title: 'User profile' }} />
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider >
  );
}

export default App;
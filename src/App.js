import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

/**Screens */
// import LoginScreen from './src/screens/LoginScreen'
// import UserScreen from './src/screens/UserScreen'

/** React navigation */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';

export default App = () => {

  // const RootStack = createStackNavigator();

  /**render screen based on user exists or not */
  // function renderScreens() {
  //   return (
  //     <>
  //       <RootStack.Screen name={'Login'} component={LoginScreen} />
  //       <RootStack.Screen name={'User'} component={UserScreen} />
  //     </>
  //   )

  // }

  return (
    // <NavigationContainer>
    //   <RootStack.Navigator>
    //     {renderScreens()}
    //   </RootStack.Navigator>
    // </NavigationContainer>
    <View>
      <Text>123</Text>
    </View>

  );
};


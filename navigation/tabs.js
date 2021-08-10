import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Image, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../contexts/authContext';
// screens
import ReferreeScreen from '../screens/ReferreeScreen';
import InformationScreen from '../screens/InformationScreen';

const Tab = createBottomTabNavigator();

const TabLogOutButton = () => {
    return null
}

const Tabs = () => {

    const { logOut } = React.useContext(AuthContext);
    const handleLogout = () => {
        Alert.alert(
            "你確定退出？",
            "",
            [
                {
                    text: "遲點",
                    onPress: () => console.log("Ask me later pressed")
                },
                { text: "確定", onPress: () => logOut() }
            ]
        );
    }
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: true,
                activeTintColor: 'blue',
                inactiveTintColor: '#d9d9d9',
                style: {
                    position: 'absolute',
                    // bottom: 25,
                    // left: 20,
                    // right: 20,
                    elevation: 0,
                    // backgroundColor: '#ffffff',
                    // borderRadius: 15,
                    height: 70,
                    borderTopColor: '#66666666',
                    backgroundColor: 'white',
                }
            }}
        >
            <Tab.Screen name="Information"
                component={InformationScreen}
                options={{
                    tabBarLabel: 'Information',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={35} />
                    ),
                }} />
            <Tab.Screen name="Exit"
                component={TabLogOutButton}
                // listeners={({ navigation, route }) => ({
                //     tabPress: handleLogout()

                // })}
                listeners={{
                    tabPress: (e) => {
                        // Prevent default action
                        handleLogout();
                    },
                }}
                options={{
                    tabBarLabel: 'Logout',
                    // tabBarOptions: {
                    //     activeTintColor: '#000',
                    //     inactiveTintColor: '#fff',
                    // },
                    tabBarIcon: ({ color }) => (
                        < MaterialCommunityIcons name="logout" color={color} size={35} />
                    ),
                }} />
        </Tab.Navigator>
    );
}
export default Tabs;
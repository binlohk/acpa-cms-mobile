import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Image, TouchableOpacity, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../contexts/authContext';
// screens
import ReferreeScreen from '../screens/ReferreeScreen';
import ScannerScreen from '../screens/ScannerScreen';
import InformationScreen from '../screens/InformationScreen';


const Tab = createBottomTabNavigator();

const TabLogOutButton = () => {
    return null
}

const Tabs = () => {

    const { logOut } = React.useContext(AuthContext);
    const handleLogout = () => {
        // console.log('logout triggered')
        logOut();
    }
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: true,
                style: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 90,
                    ...styles.shawdow,
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
            <Tab.Screen name="Scanner"
                component={ScannerScreen}
                options={{
                    tabBarLabel: 'QR CODE',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="qrcode-scan" color={color} size={35} />
                    ),
                }} />
            <Tab.Screen name="Exit"
                component={TabLogOutButton}
                listeners={({ navigation, route }) => ({
                    tabPress: handleLogout()

                })}
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

const styles = StyleSheet.create({
    shawdow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export default Tabs;
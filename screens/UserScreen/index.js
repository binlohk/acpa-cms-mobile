import React, { useContext, useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AuthContext } from '../../contexts/authContext';

export default function UserScreen({ navigation }) {
    /** logout fn */
    const { logOut } = React.useContext(AuthContext);
    const handleLogout = () => {
        // console.log('logout triggered')
        logOut();
    }

    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>User Screen</Text>
            <Button
                title="Logout"
                onPress={() => handleLogout()}
            />
        </View>
    )
}

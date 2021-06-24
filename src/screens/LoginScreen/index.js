import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LoginScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login Screen</Text>
            <Button
                title="Login"
                onPress={() => navigation.navigate('User')}
            />
        </View>
    )
}

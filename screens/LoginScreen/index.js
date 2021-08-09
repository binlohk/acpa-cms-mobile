import React, { useEffect, useState } from 'react';
import { StatusBar, TouchableHighlight, Image, StyleSheet, TextInput, Text, View, Button, SafeAreaView } from 'react-native';
import { color } from 'react-native-reanimated';
import { AuthContext } from '../../contexts/authContext';

/** 
 * {SafeAreaView} only available for ios devices
*/

export default function LoginScreen({ navigation }) {
    /**grab signin fn */
    const { logIn } = React.useContext(AuthContext);
    /**text states */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [email, setEmail] = useState('binlo@test.com');
    // const [password, setPassword] = useState('binlo123');
    const handleLogin = (email, password) => {
        logIn(email, password)
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#807038" translucent={true} />
            <Image style={{ top: -20, minWidth: "80%", minHeight: "10%" }} source={require('../../assets/icons/logo-strapi.png')} />
            <TextInput
                onChangeText={(email) => setEmail(email)}
                editable
                placeholder={'請輸入用戶電郵'}
                placeholderTextColor="gray"
                maxLength={40}
                style={styles.input}
                value={email}
            />
            <TextInput
                onChangeText={(password) => setPassword(password)}
                editable
                secureTextEntry={true}
                placeholder={'請輸入密碼'}
                placeholderTextColor="gray"
                maxLength={20}
                style={styles.input}
                value={password}
            />
            <TouchableHighlight underlayColor="#807038" style={[styles.buttonContainer, styles.loginButton]} onPress={() => handleLogin(email, password)}>
                <Text style={{ color: "white", fontSize: 18, fontWeight: 'bold' }}>登入</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'rgba(81,54,84,1)',
        justifyContent: 'center',
    },
    input: {
        width: 250,
        height: 44,
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#e8e8e8',
        borderRadius: 30
    },
    buttonContainer: {
        marginTop: 20,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: '#A5924B',
    }
});
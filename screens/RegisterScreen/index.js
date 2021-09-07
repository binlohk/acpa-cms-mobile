import React, { useEffect, useState } from 'react';
import { StatusBar, TouchableHighlight, Image, StyleSheet, TextInput, Text, View, Button, SafeAreaView, Alert } from 'react-native';
import { color } from 'react-native-reanimated';
import { AuthContext } from '../../contexts/authContext';
import * as Notifications from 'expo-notifications';
import axios from 'axios';

/** 
 * {SafeAreaView} only available for ios devices
*/

export default function LoginScreen({ navigation }) {
    /**grab signin fn */
    const { logIn } = React.useContext(AuthContext);
    /**text states */
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleRegister = async (username, email, password) => {
        let message = { username: username, email: email, password: password }
        let requestOptions = await {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        }
        let change = await fetch(`https://app.acpa.training/api/auth/local/register`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.statusCode !== 400) {
                    navigation.navigate('Login')
                    Alert.alert("我們已經發送了到您的電郵地址，請查看您的電子郵件箱。")
                }
                else
                    Alert.alert("用戶名稱或電郵已經被注冊")
            })
            .catch(err => {
                console.log(err)
                return fal
            })
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#807038" translucent={true} />
            <Image style={{ top: -20, minWidth: "80%", minHeight: "10%" }} source={require('../../assets/icons/logo-strapi.png')} />
            <TextInput
                onChangeText={(username) => setUsername(username)}
                editable
                placeholder={'請輸入用戶名稱'}
                placeholderTextColor="gray"
                maxLength={40}
                style={styles.input}
                value={username}
            />
            <TextInput
                onChangeText={(email) => setEmail(email)}
                editable
                placeholder={'請輸入電郵'}
                placeholderTextColor="gray"
                maxLength={40}
                style={styles.input}
                value={email}
            />
            <TextInput
                onChangeText={(password) => setPassword(password)}
                editable
                secureTextEntry={true}
                placeholder={'請輸入至少8個字母密碼'}
                placeholderTextColor="gray"
                maxLength={20}
                style={styles.input}
                value={password}
            />
            <TouchableHighlight underlayColor="#807038" style={[styles.buttonContainer, styles.loginButton]} onPress={async () => {
                let change = await handleRegister(username, email, password);
            }}>
                <Text style={{ color: "white", fontSize: 18, fontWeight: 'bold' }}>注冊</Text>
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
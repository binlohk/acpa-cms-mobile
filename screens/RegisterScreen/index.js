import React, { useState } from 'react';
import { View, StatusBar, TouchableHighlight, Image, StyleSheet, TextInput, Text, KeyboardAvoidingView, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

/** 
 * {SafeAreaView} only available for ios devices
*/

export default function RegisterScreen({ navigation }) {
    /**text states */
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleRegister = async (username, email, password) => {
        let message = { username: username, email: email, password: password }
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        }
        fetch(`https://app.acpa.training/api/auth/local/register`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.statusCode !== 400) {
                    navigation.navigate('Login')
                    Alert.alert("我們已經發送了到您的電郵地址，請查看您的電子郵件箱。")
                }
                else Alert.alert("用戶名稱或電郵已經被注冊")
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#807038" translucent={true} />
            <ScrollView>
                <View style={styles.container}>
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
                        await handleRegister(username, email, password);
                    }}>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: 'bold' }}>註冊</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#807038" onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: "white", fontSize: 12, fontWeight: 'bold' }}>我已經有帳戶 (按此登入)</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,
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
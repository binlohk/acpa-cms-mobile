import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Text, View, Button, SafeAreaView } from 'react-native';
import { AuthContext } from '../../contexts/authContext';

/** 
 * {SafeAreaView} only available for ios devices
*/

export default function LoginScreen({ navigation }) {
    /**grab signin fn */
    const { logIn } = React.useContext(AuthContext);
    /**text states */
    const [email, setEmail] = useState('wongw859@gmail.com');
    const [password, setPassword] = useState('strapiPassword');

    const handleLogin = (email, password) => {
        logIn(email, password)
        // console.log(email, password, 'email, password')
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <Text>Login Screen123s</Text>
                <TextInput
                    onChangeText={(email) => setEmail(email)}
                    editable
                    placeholder={'請輸入用戶電郵'}
                    maxLength={40}
                    style={styles.input}
                    value={email}
                />
                <TextInput
                    onChangeText={(password) => setPassword(password)}
                    editable
                    secureTextEntry={true}
                    placeholder={'請輸入密碼'}
                    maxLength={20}
                    style={styles.input}
                    value={password}
                />
                <Button
                    title="Login"
                    onPress={() => handleLogin(email, password)}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#ffffff',
    },
    input: {
        width: 250,
        height: 44,
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#e8e8e8'
    },
});
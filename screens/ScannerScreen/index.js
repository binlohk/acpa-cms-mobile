import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class BarcodeScannerExample extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    render() {
        const {
            hasCameraPermission,
            scanned
        } = this.state;

        if (hasCameraPermission === null) {
            return (<Text> Requesting for camera permission </Text>);
        }

        if (hasCameraPermission === false) {
            return (<Text> No access to camera </Text>);
        }

        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
                {
                    // scanned && (<Button titleStyle={{ fontSize: 25, fontWeight: '800' }} title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />)
                    scanned && (<TouchableOpacity style={{ width: '80%', borderWidth: 4, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.setState({ scanned: false })}>
                        <Text style={{ fontSize: 30, fontWeight: '600' }}>
                            Tap to Scan Again
                        </Text>
                    </TouchableOpacity>)
                }
            </View>
        );
    }
}
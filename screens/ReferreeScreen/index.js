import React, { useContext, useEffect, useState, useCallback } from 'react';
import { StatusBar, ScrollView, StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { AuthContext } from '../../contexts/authContext';
import { ShareContext } from '../../contexts/shareContext';

export default function ReferreeScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [DATA, getList] = useState([])
    const { referreeShare: [referreeList, ReferreeReply] } = React.useContext(ShareContext);


    React.useEffect(function effectFunction() {
        async function fetchData() {
            await getList(referreeList)
            await setLoading(false)
        }
        fetchData();
    }, []);

    const styles = StyleSheet.create({
        container_style: {
            flex: 1,
            minHeight: 600,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "rgba(81,54,84,1)"
        },
        header: {
            textAlign: 'center',
            padding: 20,
            fontSize: 20,
            height: 80,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center'
        },
        title: {
            fontSize: 20,
            color: "#807038",
            fontWeight: "600"
        },
        list: {
            width: "100%",
        },
        box: {
            alignSelf: "center",
            alignContent: "center",
            justifyContent: "center",
            height: 80,
            borderRadius: 20,
            width: "80%",
            backgroundColor: "white",
            marginBottom: 30,
        },
        item_style: {
            backgroundColor: '#B591FF',
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,

        },
        text: {
            fontSize: 15,
            paddingTop: 3,
            left: 16,
            fontWeight: "400"
        }
    });
    return (
        <View style={styles.container_style}>
            <View style={styles.header}>
                <Text style={styles.title}>被你邀請的用戶</Text>
            </View>
            <FlatList
                style={styles.list}
                data={DATA}
                renderItem={({ item }) =>
                    <View style={styles.box}>
                        <Text style={styles.text}>用戶名稱: {item.referral_referree.username}</Text>
                        <Text style={styles.text}>用戶電郵: {item.referral_referree.email}</Text>
                        <Text style={styles.text}>日期: {item.referral_referree.created_at.substring(0, 10)}</Text>
                    </View>
                }
            />
        </View>
    )
}

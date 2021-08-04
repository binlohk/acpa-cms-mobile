import React, { useContext, useEffect, useState, useCallback } from 'react';
import { StatusBar, ActivityIndicator, Share, ScrollView, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/authContext';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as SecureStore from 'expo-secure-store';
import { ShareContext } from '../../contexts/shareContext';

export default function ProfileScreen({ navigation }) {
    const [api, ApiReply] = React.useState("");
    const [isLoading, setLoading] = useState(true);
    const [image, setImage] = useState(false);
    const { courseShare: [courseList, CourseReply], referreeShare: [referreeList, ReferreeReply] } = React.useContext(ShareContext);
    const onShare = async () => {
        try {
            const copyLink = api ? `https://app.acpa.training/signup/${api.referralToken}` : '';
            const result = await Share.share({
                message:
                    copyLink,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    const GeneralStatusBarColor = ({ backgroundColor, ...props }) => (
        <View style={[styles.statusBar, { backgroundColor }]}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    );

    React.useEffect(function effectFunction() {
        async function fetchData() {
            let token = await SecureStore.getItemAsync('token')
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            var requestOptions = {
                method: "GET",
                headers: myHeaders,
            };
            await fetch("https://app.acpa.training/api/courses", requestOptions)
                .then((response) => response.text())
                .then((result) => JSON.parse(result))
                .then((parseResult) => parseResult.filter(item => item.purchased == true))
                .then((filterResult) => CourseReply(filterResult))
                .catch((d) => {
                    alert("500");
                });
            const apiResponse = await fetch("https://app.acpa.training/api/users/me", requestOptions)
            const parserAPI = await (apiResponse.text())
            const jsonAPI = await (JSON.parse(parserAPI))
            await ApiReply(jsonAPI)

            const referralResponse = await fetch("https://app.acpa.training/api/user-referrals", requestOptions)
            const parserReferral = await (referralResponse.text())
            const jsonReferral = await (JSON.parse(parserReferral))
            const filterResult = await (jsonReferral.filter(item => item.referral_referrer.id == jsonAPI.id))
            await ReferreeReply(filterResult)
            await setLoading(false)
            console.log(token)
        }
        fetchData();
    }, []);

    const styles = StyleSheet.create({
        statusBar: {
            height: StatusBar.currentHeight
        },
        container: {
            width: '100%'
        },
        header: {
            width: '100%',
            marginTop: 20,
            backgroundColor: 'white',
            height: 70,
        },
        companyLogo: {
            alignSelf: 'center',
            justifyContent: 'center',
            width: '35%',
            height: '35%',
            marginTop: 20
        },
        body: {
            width: '100%',
            backgroundColor: '#513654'
        },
        staticContainer: {
            height: 400,
            width: '100%',
            alignItems: 'center',
            flexDirection: 'column'
        },
        staticContainerUser: {
            height: 250,
            alignItems: 'center',
        },
        avatar: {
            width: 130,
            height: 130,
            borderRadius: 63,
            borderWidth: 4,
            borderColor: "white",
            marginBottom: 20,
            marginTop: 20
        },
        nameBox: {
            width: '30%',
            height: 150,
            alignItems: 'center',
        },
        nameUpperText: {
            color: "white",
            fontSize: 25,
            fontWeight: '800'
        },
        nameLowerText: {
            color: "white",
            marginTop: 8,
            fontSize: 15,
            fontWeight: '300'
        },
        staticContainerData: {
            marginTop: -5,
            height: 95,
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        dataBox: {
            paddingTop: 5,
            paddingRight: 30,
            width: '33%',
            height: '60%',
            alignItems: 'center',
            borderRightWidth: 3,
            borderRightColor: 'white',
        },
        specialDataBox: {
            paddingTop: 5,
            paddingLeft: 30,
            width: '30%',
            height: '60%',
            alignItems: 'center',
        },
        upperData: {
            fontSize: 25,
            fontWeight: '600',
            color: "white"
        },
        lowerData: {
            marginTop: 8,
            fontSize: 16,
            fontWeight: '300',
            color: "white"
        },
        upperText: {
            fontSize: 25,
            fontWeight: '800'
        },
        lowerText: {
            marginTop: 8,
            fontSize: 15,
            fontWeight: '300'
        },
        buttonContainer: {
            marginTop: -30,
            width: '100%',
            height: 350,
            alignItems: 'center'
        },
        redirectButtonContainer: {
            height: 100,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        redirectButton: {
            width: 150,
            height: 100,
            borderRadius: 15,
            backgroundColor: "white",
            justifyContent: 'center',
            alignItems: 'center'
        },
        shareButtonContainer: {
            height: 100,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        copyButton: {
            marginTop: 60,
            width: 300,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            borderRadius: 30,
            backgroundColor: 'white'
        }
    });

    return (
        <View>
            {isLoading ? (<View style={{ top: 300, flex: 1, justifyContent: "center" }}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#807038" translucent={true} />
                <ActivityIndicator size="large" color="#807038" />
            </View>) : (
                <ScrollView style={styles.container}>
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#807038" translucent={true} />
                    <View style={styles.body}>
                        <View style={styles.staticContainer}>
                            <View style={styles.staticContainerUser}>
                                {
                                    api.profilePicture === null ? (
                                        <Image
                                            style={styles.avatar}
                                            source={{
                                                uri: 'https://icons.iconarchive.com/icons/paomedia/small-n-flat/72/profile-icon.png'
                                            }}
                                        />
                                    ) : (
                                        <Image
                                            style={styles.avatar}
                                            source={{
                                                uri: `https://app.acpa.training/api/${api.profilePicture.url}`
                                            }}
                                        />
                                    )
                                }
                                <View style={styles.nameBox}>
                                    <Text style={styles.nameUpperText}>{api.username}</Text>
                                    <Text style={styles.nameLowerText}>會員名稱</Text>
                                </View>
                            </View>
                            <View style={styles.staticContainerData}>
                                <View style={styles.dataBox}>
                                    <Text style={styles.upperData}>{api.point || 0}</Text>
                                    <Text style={styles.lowerData}>獎賞分數</Text>
                                </View>
                                <View style={styles.specialDataBox}>
                                    <Text style={styles.upperData}>{api.Membership}</Text>
                                    <Text style={styles.lowerData}>會員階級</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <View style={styles.redirectButtonContainer}>
                                <TouchableOpacity onPress={() => navigation.navigate('Referree')}>
                                    <View style={styles.redirectButton}>
                                        <Text style={styles.upperText}>{referreeList.length}</Text>
                                        <Text style={styles.lowerText}><Icon name="user" color="#4F8EF7" size={15} solid /> 你推薦的會員</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Courses')} >
                                    <View style={styles.redirectButton}>
                                        <Text style={styles.upperText}>{courseList.length}</Text>
                                        <Text style={styles.lowerText}><Icon name="book" color="#4F8EF7" size={15} /> 你擁有的課程</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.shareButtonContainer}>
                                <TouchableOpacity onPress={onShare}>
                                    <View style={styles.copyButton}>
                                        <Text style={{ right: 15 }} > 分享推薦鏈接</Text>
                                        <Icon style={{ left: 15 }} name="share-alt" color="#4F8EF7" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView >
            )
            }
        </View >
    )
}

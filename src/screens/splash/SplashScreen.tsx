import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { horizontalScale, verticalScale } from '../../utils';
import { Colors } from '../../utils/appConstants';
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('SearchUserInfo')
        }, 2000);
    }, [])
    return (
        <View style={styles.container}>
            {/* Image Section */}
            <View style={styles.imageWrapper}>
                <FastImage
                    style={styles.image}
                    source={require('../../assets/images/laundryMachineGif.gif')}
                    resizeMode={FastImage.resizeMode.contain}
                />

            </View>

            {/* Text Section */}
            <View style={styles.textWrapper}>
                <Text style={styles.text}>Welcome to Superior Clean and Press!</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.base.White,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    imageWrapper: {
        width: horizontalScale(150),
        height: verticalScale(150),
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textWrapper: {
        marginTop: 20,
        borderWidth: 2,
        borderColor: Colors.blue.Blue900,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    button: {
        marginTop: 30,
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#388E3C',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SplashScreen;

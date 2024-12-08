import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ToastAndroid } from 'react-native';
import { useDispatch } from 'react-redux';
import { horizontalScale, moderateScale, verticalScale } from '../../utils';
import { getUserByIdentifier } from '../../components/handleSearchComp';

const SearchUserInfo = () => {
    const [seriolNo, setSeriolNo] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigation = useNavigation()

    const handleSave = async () => {
        // Placeholder function to handle save action
        if (phoneNumber === '' && seriolNo === '') {
            ToastAndroid.show('please enter SERIOL NO. or PHONE NUMBER!', ToastAndroid.LONG)
            return
        }
        const user = await getUserByIdentifier(seriolNo, phoneNumber)
        if (!user) {
            ToastAndroid.show('Details not found!', ToastAndroid.SHORT)
            return
        } else {
            // @ts-ignore
            navigation.navigate('OrderDetails', {
                seriolNo: seriolNo,
                phoneNumber: phoneNumber,
            })
        }
    };

    const handleNewOrder = () => {
        navigation.navigate('RateListComponent')
    }


    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ justifyContent: 'space-evenly', flex: 1 }}
            >
                <View style={styles.imageWrapper}>
                    <Image
                        source={require('../../assets/images/laundryBasket.png')} // Replace with your desired image URL
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.headerText}>{`Superior Cleaners`} </Text>

                {/* Name Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Seriol no.</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="...."
                        value={seriolNo}
                        keyboardType="phone-pad"
                        onChangeText={setSeriolNo}
                    />
                </View>

                {/* Phone Number Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="...."
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleNewOrder}>
                    <Text style={styles.buttonText}>New Order</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    imageWrapper: {
        width: horizontalScale(150),
        height: verticalScale(150),
        alignSelf: 'center',
        marginTop: moderateScale(10)
    },
    image: {
        width: '100%',
        height: '100%',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    input: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 5,
        color: '#333',
    },
    button: {
        backgroundColor: '#2196F3',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#2196F3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SearchUserInfo;

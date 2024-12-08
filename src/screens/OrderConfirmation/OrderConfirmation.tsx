import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
    FlatList,
    ScrollView,
    Dimensions,
    Animated,
    Alert,
    ToastAndroid,
} from 'react-native';
import { GlobalStyles } from '../../utils/GlobalStyles';
import { moderateScale, verticalScale } from '../../utils';
import { TextComp } from '../../assets/components/text/TextComp';
import { Calendar } from 'react-native-calendars';
import { Colors } from '../../utils/appConstants';
import moment from 'moment';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import BackButtonComp from '../../assets/components/backButton/BackButtonComp';
import Loader from '../../components/Loader/Loader';


const OrderConfirmation = ({ route }) => {
    const { selectedItems } = route?.params;
    const navigation = useNavigation()
    const opacity = useRef(new Animated.Value(1)).current;
    const isFocus = useIsFocused()
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [advanceAmount, setAdvanceAmount] = useState('');
    const [deliveryDate, setdeliveryDate] = useState();
    const [openCalendar, setOpenCalendar] = useState(false);
    const [nextItemId, setNextItemId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [nameBorder, setnameBorder] = useState(Colors.base.Black)
    const [phoneBorder, setPhoneBorder] = useState(Colors.base.Black)


    useEffect(() => {
        if (selectedItems?.length > 0) {
            startBlinking();
        }
    }, [opacity, selectedItems]);

    useEffect(() => {
        getUsersCount()
    }, [isFocus])

    const getUsersCount = async () => {
        try {
            const countQuery = await firestore()
                .collection('users')
                .count()
                .get();
            const count = countQuery.data().count; // Aggregated count
            setNextItemId(count + 1)
        } catch (error) {
            console.error('Error fetching users count:', error);
        }
    };

    const startBlinking = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };


    const handleSubmission = async () => {
        const payload =
        {
            srNo: nextItemId,
            name: name,
            phoneNumber: phoneNumber,
            totalPrice: totalPrice,
            bookingDate: Date.now(),
            deliveryDate: deliveryDate,
            advance: advanceAmount,
            items: selectedItems.map((item) => {
                return {
                    item: item?.name,
                    quantity: item?.quantity,
                    price: item?.price,
                    notes: item?.notes
                }
            })
        }
        try {
            setIsLoading(true)
            console.log('User payload!', payload);
            await firestore().collection('users').doc(`${nextItemId}`).set(payload);
            console.log('User added with custom ID!');
            Alert.alert('Order Submitted Successfully')
            navigation.replace('SearchUserInfo')
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)

            console.log(error);
        }
    }
    const handleValidation = () => {
        if (deliveryDate === '') {
            Alert.alert('Please add delivery data!')
        } else if (name === '') {
            ToastAndroid.show('please add name!', ToastAndroid.SHORT)
            setnameBorder(Colors.base.Red)
        } else if (phoneNumber === '') {
            ToastAndroid.show('please add phone number!', ToastAndroid.SHORT)
            setPhoneBorder(Colors.base.Red)
        } else if (advanceAmount === '') {
            Alert.alert('Empty Advance Amount', 'Are you sure ?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => handleSubmission() },
            ]);
        } else {
            handleSubmission()
        }
    }
    // Calculate the total price
    const totalPrice = selectedItems.reduce((sum, item) => {
        return sum + (item.isChecked ? parseFloat(item.price * item?.quantity) : 0);
    }, 0);
    return (
        <View style={{ flex: 1, paddingHorizontal: moderateScale(10) }}>
            <Loader state={isLoading} />
            <ScrollView
            >
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginVertical: 10 }}>
                    <BackButtonComp prevName={'Select Order'} textColor={Colors.base.Black} />
                </View>
                <TextComp style={styles.title} label={'Order Confirmation'} />
                <View style={styles.cartContainer}>
                    <View style={styles.selectedListContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
                            <TextComp
                                label={'Seriol No: ' + nextItemId}
                            />

                            <TextComp
                                label={'Total items: ' + selectedItems?.length}
                            />
                            <TextComp
                                label={'Total Amount: ' + totalPrice}
                            />
                        </View>
                        <View style={{ justifyContent: 'space-between', width: '100%', alignItems: 'flex-end', flexDirection: 'row' }}>
                            <TextComp
                                label={'Booking date \n' + moment().format('LL')}
                                style={{ textAlign: 'center' }}
                            />
                            {selectedItems?.length > 0 &&
                                <TouchableOpacity
                                    onPress={() => {
                                        setOpenCalendar(true)
                                    }}>
                                    {
                                        deliveryDate ?
                                            <TextComp
                                                label={'Delivery date \n' + moment(deliveryDate).format('LL')}
                                                style={{ textAlign: 'center' }}

                                            />
                                            :
                                            <Animated.View style={[styles.blinkingView, { opacity }]}>
                                                <TextComp
                                                    label={'Delivery date \n'}
                                                />
                                            </Animated.View>
                                    }

                                </TouchableOpacity>
                            }
                        </View>
                    </View>

                </View>
                <Modal
                    visible={openCalendar}
                    transparent
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: Colors.transparent.extraBlack,
                        justifyContent: 'flex-end',

                    }}>
                        <View style={{
                            justifyContent: 'flex-end',
                            height: verticalScale(300),
                            backgroundColor: '#ffffff',
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                        }}>
                            <Calendar
                                onDayPress={day => {
                                    setdeliveryDate(day?.timestamp);
                                    console.log('day', day?.timestamp)
                                    setOpenCalendar(false)
                                }}
                                style={{
                                    borderColor: 'gray',
                                    height: 350,
                                }}
                                theme={{
                                    backgroundColor: '#ffffff',
                                    calendarBackground: '#ffffff',
                                    textSectionTitleColor: '#b6c1cd',
                                    selectedDayBackgroundColor: '#00adf5',
                                    selectedDayTextColor: '#ffffff',
                                    todayTextColor: '#00adf5',
                                    dayTextColor: '#2d4150',
                                    textDisabledColor: '#dd99ee'
                                }}>
                            </Calendar>
                        </View>
                    </View>
                </Modal>
                <TextInput
                    style={[styles.input, { borderColor: nameBorder }]}
                    placeholder="Name"
                    placeholderTextColor="#aaa"
                    value={name}
                    onChangeText={(txt) => {
                        console.log(txt)
                        setName(txt)
                        if (txt.length === 0) {
                            setnameBorder(Colors.base.Red)
                        } else {
                            setnameBorder(Colors.base.Black)
                        }
                    }}
                />

                <TextInput
                    style={[styles.input, { borderColor: phoneBorder }]}
                    placeholder="Phone Number"
                    placeholderTextColor="#aaa"
                    value={phoneNumber}
                    keyboardType="phone-pad"
                    onChangeText={(txt) => {
                        console.log(txt)
                        setPhoneNumber(txt)
                        if (txt.length === 0) {
                            setPhoneBorder(Colors.base.Red)
                        } else {
                            setPhoneBorder(Colors.base.Black)
                        }
                    }}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Advance Amount"
                    placeholderTextColor="#aaa"
                    value={advanceAmount}
                    keyboardType="numeric"
                    onChangeText={setAdvanceAmount}
                />
                <View style={{
                    marginBottom: verticalScale(10),
                }}>
                    {selectedItems?.map((item, index) => {
                        return (
                            <View key={index} style={styles.itemContainer}>
                                <Text style={styles.itemName}>{item?.name}</Text>
                                <Text style={styles.itemDetails}>Quantity: {item?.quantity}</Text>
                                <Text style={styles.itemDetails}>Price: {item?.price} PKR</Text>
                                <Text style={[styles.itemDetails, GlobalStyles?.body1Bold]}>Note: {item?.notes ? item?.notes : 'N/A'}</Text>
                            </View>
                        )
                    })}
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => { navigation.goBack() }}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.submitButton]}
                        onPress={() => { handleValidation() }}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },
    modalContainer: {
        width: '95%',
        alignSelf: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        alignSelf: 'center',
        textAlign: 'center',
        width: '100%',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.base.Black,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        fontSize: 16,
        color: '#333',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        bottom: 5,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#e74c3c',
    },
    submitButton: {
        backgroundColor: '#2ecc71',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    itemContainer: {
        alignItems: 'flex-start',
        margin: 10,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderRadius: 10
    },
    textContainer: {
        marginLeft: 10,
        flex: 1,
    },
    itemName: {
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    quantityButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2196F3',
        borderRadius: 5,
    },
    itemDetails: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    cartContainer: {
        width: '100%',
        backgroundColor: Colors.other.hawkesBlue,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        justifyContent: 'space-between',
    },
    selectedListContainer: {
        width: '100%',
        padding: 10,
        gap: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    blinkingView: {
        backgroundColor: Colors.other.hawkesBlue,
    },
    cartOpacity: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 20,
        backgroundColor: Colors.blue.Blue300,

    },
});

export default OrderConfirmation;

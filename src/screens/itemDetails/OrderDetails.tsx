import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TextComp } from '../../assets/components/text/TextComp';
import moment from 'moment';
import BackButtonComp from '../../assets/components/backButton/BackButtonComp';
import { Colors } from '../../utils/appConstants';
import { GlobalStyles } from '../../utils/GlobalStyles';
import { getUserByIdentifier } from '../../components/handleSearchComp';

const OrderDetails = ({ route }) => {
    const { seriolNo, phoneNumber } = route?.params
    // Destructure data passed via route parameters
    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        getUserOrder()
    }, [])


    const getUserOrder = async () => {
        const user = await getUserByIdentifier(seriolNo, phoneNumber)
        setUserDetails(user)

    }

    return (
        <View style={styles.container}>
            <BackButtonComp textColor={Colors.base.Black} style={{}} prevName={'Back'} />
            <TextComp
                style={styles.label}
                label={userDetails?.name} />

            <View style={styles.infoContainer}>
                <TextComp style={styles.label} label={'Seriol No:'} />
                <TextComp style={styles.value} label={userDetails?.srNo} />

                <TextComp style={styles.label} label={'Booking Date:'} />
                <TextComp style={styles.value} label={moment(userDetails?.bookingDate).format('LL')} />

                <TextComp style={styles.label} label={'Delivery Date:'} />
                <Text style={styles.value}>{moment(userDetails?.deliveryDate).format('LL')}</Text>

                <TextComp style={styles.label} label={'Total:'} />
                <Text style={styles.value}>{userDetails?.totalPrice} PKR</Text>

                <TextComp style={styles.label} label={'Advance:'} />
                <Text style={styles.value}>{userDetails?.advance || 0} PKR</Text>

            </View>

            {/* Display Items in a List */}
            <Text style={styles.sectionTitle}>Items:</Text>

            <FlatList
                data={userDetails && userDetails?.items}
                keyExtractor={(item, index) => index.toString()}
                style={{ flex: 1, width: '100%' }}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemName}>{item?.item}</Text>
                            <Text style={styles.itemDetails}>Quantity: {item?.quantity}</Text>
                            <Text style={styles.itemDetails}>Price: {item?.price} PKR</Text>
                            <Text style={[styles.itemDetails, GlobalStyles?.body1Bold]}>Note: {item?.notes ? item?.notes : 'N/A'}</Text>
                        </View>
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
        width: '100%'
    },
    infoContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 10,
        width: '100%'
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    value: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: '100%'
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    itemDetails: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
});

export default OrderDetails;

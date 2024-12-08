import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TextComp } from '../../assets/components/text/TextComp';
import moment from 'moment';
import { APPJSONFILES } from '../../utils/JsonFiles';
import BackButtonComp from '../../assets/components/backButton/BackButtonComp';
import { Colors } from '../../utils/appConstants';

const OrderDetails = () => {
    // Destructure data passed via route parameters
    const [rateList, setRateList] = useState(APPJSONFILES.rateList)

    // const { bookingData, deliveryDate, total, advance, items } = route?.params;

    return (
        <View style={styles.container}>
            <BackButtonComp textColor={Colors.base.Black} style={{}} prevName={'Back'}/>
            <TextComp
                style={styles.label}
                label={'Shahzaib'} />

            {/* Display Booking Information */}
            <View style={styles.infoContainer}>
                <TextComp style={styles.label} label={'Booking Data:'} />
                <TextComp style={styles.value} label={moment().format('LL')} />

                <TextComp style={styles.label} label={'Delivery Date:'} />
                <Text style={styles.value}>{moment().format('LL')}</Text>

                <TextComp style={styles.label} label={'Total:'} />
                <Text style={styles.value}>{2000} PKR</Text>

                <TextComp style={styles.label} label={'Advance:'} />
                <Text style={styles.value}>{1000} PKR</Text>

            </View>

            {/* Display Items in a List */}
            <Text style={styles.sectionTitle}>Items:</Text>
            <FlatList
                data={rateList}
                keyExtractor={(item, index) => index.toString()}
                style={{ flex: 1, width: '100%' }}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemDetails}>Quantity: {item.quantity}</Text>
                        <Text style={styles.itemDetails}>Price: {item.price} PKR</Text>
                    </View>
                )}
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
        marginBottom: 20,
        width: '100%'
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
        fontWeight: 'bold',
        alignSelf:'center'
                // justifyContent: 'center',
        // alignItems: 'center',

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

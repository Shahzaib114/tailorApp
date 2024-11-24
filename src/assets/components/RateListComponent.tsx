import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Modal, Animated, Alert } from 'react-native';
import { CustomCheckBox } from './CustomCheckBox';
import { Colors } from '../../utils/appConstants';
import { TextComp } from './text/TextComp';
import moment from 'moment';
import { Calendar } from 'react-native-calendars';
import { verticalScale } from 'react-native-size-matters';
import { APPJSONFILES } from '../../utils/JsonFiles';
import SelectedItemsList from '../../components/Modal/selectedItemsModal';

const RateListComponent = () => {
    // State to manage each item with notes
    const [selectedItems, setSelectedItems] = useState([])
    const [deliveryDate, setdeliveryDate] = useState()
    const [openCalendar, setOpenCalendar] = useState(false)
    const opacity = useRef(new Animated.Value(1)).current;
    const [rateList, setRateList] = useState(APPJSONFILES.rateList)

    useEffect(() => {
        if (selectedItems?.length > 0) {
            startBlinking();
        }
    }, [opacity, selectedItems]);

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

    const [items, setItems] = useState(
        rateList.map((item) => ({
            ...item,
            isChecked: false,
            quantity: item.quantity,
            price: item.price.toString(),
            notes: item.notes || '', // Initialize notes as an empty string if not provided
        }))
    );

    useEffect(() => {
        const selectedObjects = items?.filter(item => { return item?.isChecked === true })
        setSelectedItems(selectedObjects)
    }, [items])

    const toggleCheckbox = (index) => {
        const updatedItems = items.map((item, i) =>
            i === index ? { ...item, isChecked: !item.isChecked } : item
        );
        setItems(updatedItems);
    };

    const incrementQuantity = (index) => {
        const updatedItems = items.map((item, i) =>
            i === index ? { ...item, quantity: item.quantity + 1 } : item
        );
        setItems(updatedItems);
    };

    const decrementQuantity = (index) => {
        const updatedItems = items.map((item, i) =>
            i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setItems(updatedItems);
    };

    const handlePriceChange = (text, index) => {
        const updatedItems = items.map((item, i) =>
            i === index ? { ...item, price: text } : item
        );
        setItems(updatedItems);
    };

    const handleNotesChange = (text, index) => {
        const updatedItems = items.map((item, i) =>
            i === index ? { ...item, notes: text } : item
        );
        setItems(updatedItems);
    };

    return (
        <View style={styles.mainContainer}>
            <SelectedItemsList rateList={selectedItems} isVisible={true} onClose={() => { }} />
            <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.itemContainer}>
                        <CustomCheckBox
                            isChecked={item.isChecked}
                            onPress={() => toggleCheckbox(index)}
                            color="#2196F3"
                            size={24}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.itemName}>{item.name}</Text>

                            {/* Quantity Controls */}
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity onPress={() => decrementQuantity(index)} style={styles.quantityButton}>
                                    <Text style={styles.buttonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText}>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => incrementQuantity(index)} style={styles.quantityButton}>
                                    <Text style={styles.buttonText}>+</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Price Input */}
                            <View style={styles.priceContainer}>
                                <Text style={styles.priceLabel}>Price: </Text>
                                <TextInput
                                    style={styles.priceInput}
                                    value={item.price}
                                    keyboardType="numeric"
                                    onChangeText={(text) => handlePriceChange(text, index)}
                                />
                                <Text> PKR</Text>
                            </View>

                            {/* Notes Input */}
                            <View style={styles.notesContainer}>
                                <Text style={styles.notesLabel}>Notes:</Text>
                                <TextInput
                                    style={styles.notesInput}
                                    placeholder="Add notes here"
                                    value={item.notes}
                                    onChangeText={(text) => handleNotesChange(text, index)}
                                    multiline
                                />
                            </View>
                        </View>
                    </View>
                )}
                style={{ width: '90%', alignSelf: 'center' }}
            />

            <View style={styles.cartContainer}>
                <View style={styles.selectedListContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextComp
                            label={'Total items: ' + selectedItems?.length}
                        />
                        <TextComp
                            label='Total Amount: 1000'
                        />
                        <TextComp
                            label='Advance: 1000'
                        />
                    </View>
                    <TextComp
                        label={'Booking date: ' + moment().format('LL')}
                    />
                    {selectedItems?.length > 0 &&
                        <TouchableOpacity
                            onPress={() => {
                                setOpenCalendar(true)
                            }}>
                            {
                                deliveryDate ?
                                    <TextComp
                                        label={'Delivery date: ' + moment(deliveryDate).format('LL')}
                                    />
                                    :
                                    <Animated.View style={[styles.blinkingView, { opacity }]}>
                                        <TextComp
                                            label={'Delivery date: '}
                                        />
                                    </Animated.View>
                            }

                        </TouchableOpacity>
                    }
                </View>
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert('Order place, Thank you')
                        setSelectedItems([])
                        setdeliveryDate(null)
                        startBlinking()
                    }}
                    style={styles.cartOpacity}>
                    <TextComp
                        label='Place Order'
                    />
                </TouchableOpacity>
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
                                setdeliveryDate(day.dateString);
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
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: Colors.other.background
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
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
    buttonText: {
        fontSize: 18,
        color: '#2196F3',
    },
    quantityText: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    priceLabel: {
        fontSize: 16,
    },
    blinkingView: {
        // width: 100,
        // height: 100,
        backgroundColor: Colors.other.hawkesBlue,
        // borderRadius: 10,pl
    },
    priceInput: {
        borderBottomWidth: 1,
        borderColor: '#2196F3',
        padding: 5,
        width: 60,
        textAlign: 'center',
    },
    notesContainer: {
        marginTop: 10,
    },
    notesLabel: {
        fontSize: 16,
        color: '#666',
    },
    notesInput: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 8,
        fontSize: 14,
        color: '#333',
        textAlignVertical: 'top',
    },
    cartContainer: {
        height: 100,
        width: '100%',
        backgroundColor: Colors.other.doveGray,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    selectedListContainer: {
        width: '85%',
        padding: 10,
        gap: 5,

    },
    cartOpacity: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 20,
        backgroundColor: Colors.blue.Blue300,

    },
});

export default RateListComponent;

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Animated, Image, Alert } from 'react-native';
import { CustomCheckBox } from './CustomCheckBox';
import { Colors } from '../../utils/appConstants';
import { APPJSONFILES } from '../../utils/JsonFiles';
import SelectedItemsList from '../../components/Modal/selectedItemsModal';
import { useDispatch } from 'react-redux';
import { OrderNewUser } from '../../store/reducers/ApiHelpers';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { TextComp } from './text/TextComp';
import { horizontalScale, verticalScale } from '../../utils';
import BackButtonComp from './backButton/BackButtonComp';

const RateListComponent = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [clonedArray, setClonedArray] = useState([])

    const [items, setItems] = useState(APPJSONFILES.rateList.map((item) => ({
        ...item,
        isChecked: false,
        quantity: 1,
        price: item.price.toString(),
        notes: '',
    })));
    const [searchText, setSearchText] = useState('');
    const [filteringProcess, setFilteringProcess] = useState(APPJSONFILES.rateList.map((item) => ({
        ...item,
        isChecked: false,
        quantity: 1,
        price: item.price.toString(),
        notes: '',
    })))
    const [selectedItems, setSelectedItems] = useState([]);

    // Update selected items whenever the `items` state changes
    useEffect(() => {
        const selectedObjects = filteringProcess.filter((item) => item.isChecked);
        // setFilteringProcess(items)
    }, [filteringProcess]);

    useEffect(() => {
        setItems(APPJSONFILES.rateList.map((item) => ({
            ...item,
            isChecked: false,
            quantity: 1,
            price: item.price.toString(),
            notes: '',
        })))
    }, [isFocused]);

    useEffect(() => {
        handleSelecteditems()
    }, [filteringProcess]);


    // Toggle checkbox for an item
    const toggleCheckbox = (index) => {
        const updatedItems = filteringProcess.map((item, i) =>
            i === index ? { ...item, isChecked: !item.isChecked } : item
        );
        // handleSelecteditems()
        setFilteringProcess(updatedItems);
    };

    // Increment quantity
    const incrementQuantity = (index) => {
        const updatedItems = filteringProcess.map((item, i) =>
            i === index ? { ...item, quantity: item.quantity + 1 } : item
        );
        // setItems(updatedItems);
        setFilteringProcess(updatedItems);

    };

    // Decrement quantity
    const decrementQuantity = (index) => {
        const updatedItems = filteringProcess.map((item, i) =>
            i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        // setItems(updatedItems);
        setFilteringProcess(updatedItems);

    };
    const handleNotesChange = (text, index) => {
        const updatedItems = filteringProcess.map((item, i) =>
            i === index ? { ...item, notes: text } : item
        );
        setFilteringProcess(updatedItems);
    };


    // Handle search input
    const handleSelecteditems = () => {
        const selectedObjects = filteringProcess?.filter((item) => item.isChecked);
        setSelectedItems(selectedObjects)
    };

    const replaceMatchingObjects = (array1, array2) => {
        return array1.map(obj1 => {
            // Check if any object in array2 has the same name as obj1
            const matchingObj = array2.find(obj2 => obj1.name === obj2.name);
            // Replace obj1 with matchingObj if found, otherwise keep obj1
            // console.log('matchingObj', array2)
            return matchingObj ? matchingObj : obj1;
        });
    };

    // Filter items based on the search text
    const handleSearchItems = (txt) => {
        setClonedArray(filteringProcess)
        const filteredItems = items?.filter((item) =>
            item.name.toLowerCase().includes(txt.toLowerCase())
        );

        console.log('selectedItems', selectedItems)
        const updatedArray = replaceMatchingObjects(filteredItems, selectedItems);

        // if(filteredItems){
        setFilteringProcess(updatedArray)
        // }
    }
    // Handle Search
    const handleSearch = (text) => {
        setSearchText(text);

        if (text.trim() === '') {
            // Show all items if search text is empty
            // setFilteringProcess(items);
            return;
        }

        // Filter main array based on search text
        const filtered = items.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );

        // Ensure selected items are part of the filtered result if they match the search
        const selectedAndFiltered = selectedItems.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );

        // Merge selected items and filtered items, removing duplicates
        const merged = [...new Set([...selectedAndFiltered, ...filtered])];

        setFilteringProcess(merged);
    };
    const handlePriceChange = (text, index) => {
        const updatedItems = filteringProcess.map((item, i) =>
            i === index ? { ...item, price: text } : item
        );
        setFilteringProcess(updatedItems);
    };

    // useEffect(() => {
    //     handleSearchItems()
    // }, [searchText])

    return (
        <View style={styles.mainContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', margin: 10 }}>
                <BackButtonComp prevName={'Back'} textColor={Colors.base.Black} />
            </View>
            {/* <View style={styles.inputContainer}>
                <View style={styles.searchIconContainer}>
                    <Image
                        source={require('../images/searchIcon.png')}
                        resizeMode='contain'
                        style={styles.searchImg}
                    />
                </View>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name"
                    placeholderTextColor="#aaa"
                    value={searchText}
                    onChangeText={(txt) => {
                        setSearchText(txt)
                        // handleSearch(txt)
                        handleSearchItems(txt)
                    }}
                />
            </View> */}
            <SelectedItemsList rateList={selectedItems} isVisible={false} onClose={() => { }} />
            <FlatList
                data={filteringProcess}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.itemContainer}>
                        <CustomCheckBox
                            isChecked={item?.isChecked}
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
            <TouchableOpacity
                onPress={() => {
                    if (selectedItems?.length === 0) {
                        Alert.alert('Please select orders')
                        return
                    }
                    setItems(items)
                    //@ts-ignore
                    navigation.navigate('OrderConfirmation', {
                        selectedItems: selectedItems
                    })
                }}
                style={styles.cartOpacity}>
                <TextComp
                    label='Place Order'
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: Colors.other.background
    },
    inputContainer: {
        backgroundColor: Colors.base.White,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        width: '95%',
        gap: 20,
        paddingVertical: verticalScale(2),
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    searchIconContainer: {
        width: horizontalScale(20),
        height: verticalScale(20)
    },
    searchImg: {
        width: '100%',
        height: '100%',
    },
    searchInput: {
        width: '80%',
        fontSize: 16,
        backgroundColor: '#fff',
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
        width: '100%',
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
        backgroundColor: Colors.blue.Blue300,

    },
});

export default RateListComponent;

import React from 'react';
import { FlatList, View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { BackButtonArrow } from '../../assets/components/backButton/BackButtonArrow';
import { horizontalScale, moderateScale, verticalScale } from '../../utils';
import { SvgXml } from 'react-native-svg';
import { CloseIcon } from '../../assets/svgs/CloseIcon';

type RateItem = {
    name: string;
    quantity: number;
    price: number;
    notes: string;
};

type RateListProps = {
    rateList: RateItem[];
    isVisible: boolean;
    onClose: () => void;
};

const SelectedItemsList: React.FC<RateListProps> = ({
    rateList,
    isVisible,
    onClose,
}) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <TouchableOpacity onPress={onClose} style={styles.closeContainer}>
                    <SvgXml
                        xml={CloseIcon}
                        width={horizontalScale(35)}
                        height={verticalScale(35)}
                    />
                </TouchableOpacity>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Selected Details</Text>
                    <FlatList
                        data={rateList}
                        keyExtractor={(_, index) => index.toString()}
                        style={{ flex: 1, width: '100%' }}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemDetails}>Quantity: {item.quantity}</Text>
                                <Text style={styles.itemDetails}>Price: {item.price} PKR</Text>
                                <Text style={styles.itemDetails}>Notes: {item.notes}</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        height: '70%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    itemContainer: {
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    itemDetails: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    closeContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: moderateScale(10),
      },
    
});

export default SelectedItemsList;

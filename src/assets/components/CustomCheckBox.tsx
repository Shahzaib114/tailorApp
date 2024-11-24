// CustomCheckBox.js

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export const CustomCheckBox = ({ isChecked, onPress, label, color = '#2196F3', size = 24 }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View
                style={[
                    styles.checkbox,
                    {
                        width: size,
                        height: size,
                        borderColor: color,
                        backgroundColor: isChecked ? color : 'transparent',
                    },
                ]}
            >
                {isChecked && <View style={[styles.checkmark, { borderColor: 'white' }]} />}
            </View>
            {label && <Text style={styles.label}>{label}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 4,
    },
    checkmark: {
        width: 10,
        height: 10,
        borderWidth: 2,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        transform: [{ rotate: '45deg' }],
    },
    label: {
        marginLeft: 8,
        fontSize: 16,
    },
});

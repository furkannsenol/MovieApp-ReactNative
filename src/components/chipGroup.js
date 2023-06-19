import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ChipGroup = () => {
    return (
        <View style={styles.itemGroup}>
            <View style={styles.chipItem}>
                <Text style={{ color: 'white', fontSize:13 }}>Animation</Text>
            </View>
            <View style={styles.chipItem}>
                <Text style={{ color: 'white', fontSize:13 }}>Adventure</Text>
            </View>
            <View style={styles.chipItem}>
                <Text style={{ color: 'white', fontSize:13 }}>Fantasy</Text>
            </View>
            <View style={styles.chipItem}>
                <Text style={{ color: 'white', fontSize:13 }}>Family</Text>
            </View>
            
        </View>
    )
}

export default ChipGroup

const styles = StyleSheet.create({
    itemGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    chipItem: {
        backgroundColor: "#333",
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 16,
        marginRight: 5,
        marginTop: 5
    }
})
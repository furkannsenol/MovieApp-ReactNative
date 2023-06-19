import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

const PopularMovieItem = ({ item, theme }) => {
    const navigation = useNavigation()
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("MovieDetail", { item: item })}>
            <View style={styles.item} >
                <View>
                    <Image
                        style={styles.poster}
                        source={{ uri: "https://image.tmdb.org/t/p/w342" + item.poster_path }} />
                    <Text style={{ width: 171, textAlign: 'center', color: theme }}>{item.title}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default PopularMovieItem

const styles = StyleSheet.create({
    item: {
        flexDirection: "column",
        flexWrap: 'wrap',
        marginRight: 10,
    },
    poster: {
        width: 171,
        height: 255.5,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: 'gray'
    },

})
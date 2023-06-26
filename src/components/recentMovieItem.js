import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native'
import { setGenreName } from '../redux/actions/genreActions';
import { useDispatch, useSelector } from 'react-redux';

const RecentMovieItem = ({ item, theme, genres }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const genresName = useSelector(state => state.genreReducer.genresName)

    const deviceWidth = Dimensions.get('window').width
    const _width = deviceWidth - 40 - 171
    
    
return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("MovieDetail", { item: item })}>

        <View style={styles.item}>
            {item.poster_path !== null ? (
                (item.poster_path.length < 100) ? (
                    <Image style={styles.poster} source={{ uri: "https://image.tmdb.org/t/p/w342" + item.poster_path }}/>
                ) : (
                    <Image style={styles.poster} source={{ uri: item.poster_path }}/>
                )
            ) :
                (
                    <Image style={[styles.poster, { resizeMode: 'contain' }]} source={require("../assets/no_image_available.jpg")} />
                )}

            <View style={{ marginLeft: 10, width: _width }}>

                <Text style={{ color: theme.text }}>{item.title}</Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
                    <MaterialCommunityIcons name='star' size={20} color={"#FE6D8E"} />
                    <Text style={{ alignSelf: 'center', fontSize: 15, fontWeight: 'bold', color: theme.text }}>{(item.vote_average).toFixed(1)}</Text>
                    <Text style={{ fontSize: 10, alignSelf: 'flex-end', color: theme.text }}>/10</Text>

                </View>

            </View>
        </View>

    </TouchableWithoutFeedback>
)
}

export default RecentMovieItem

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    poster: {
        width: 171,
        height: 255.5,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: 'gray',
    },

})
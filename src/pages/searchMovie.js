import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Dimensions, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../styles/themeMode';
import { useEffect } from 'react';
import { getSearchMovie, setSearchMovieClear } from '../redux/actions/searchMovieActions';
import RecentMovieItem from '../components/recentMovieItem';

const SearchMovie = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const totalPages = useSelector(state => state.searchMovieReducer.totalPages)
    const searchMovies = useSelector(state => state.searchMovieReducer.searchMovies)
    const totalResults = useSelector(state => state.searchMovieReducer.totalResults)
    const isLoading = useSelector(state => state.searchMovieReducer.isLoading)
    const theme = route.params.theme


    const [text, setText] = useState('');

    const clearText = () => {
        setText('');
    };

    // useEffect(() => {
    //     console.log(text)
    // }, [text])

    // useEffect(() => {
    //     dispatch(setSearchMovieClear())
    //     if (text.length > 2) {

    //         dispatch(getSearchMovie(text, 1))
    //     }
    // }, [text])

    useEffect(() => {
        let timeoutId;

        if (text.length > 2) {
            timeoutId = setTimeout(() => {
                dispatch(setSearchMovieClear());
                dispatch(getSearchMovie(text, 1));
            }, 500);
        }

        return () => clearTimeout(timeoutId);

    }, [text]);

    // useEffect(() => {
    //     console.log(searchMovies)
    //     console.log(totalPages)
    //     console.log(totalResults)
    // }, [searchMovies])

    const renderLoader = () => {
        if (isLoading) {
            return (
                <View style={{
                    alignItems: 'center', marginVertical: 16
                }}>
                    <ActivityIndicator size='small' />
                </View >
            )
        }
    }


    const deviceWidth = Dimensions.get('window').width
    const _width = deviceWidth - 86
    const deviceHeight = Dimensions.get('window').height

    return (
        <View style={{ flex: 1, backgroundColor: theme.bg }}>

            <View style={styles.header}>


                <TouchableWithoutFeedback onPress={() => navigation.pop()}>
                    <View style={{ padding: 10 }}>
                        <MaterialCommunityIcons name='arrow-left' size={24} color={theme.text} style={{ marginTop: 7 }} />
                    </View>
                </TouchableWithoutFeedback>

                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'gray', borderRadius: 8, width: _width, marginLeft: 10, marginRight: 20, height: 40, marginTop: 10 }}>
                    <MaterialCommunityIcons name="movie-search-outline" size={24} color="gray" style={{ marginHorizontal: 8 }} />
                    <TextInput
                        style={{ flex: 1, height: 40, color: theme.text }}
                        value={text}
                        onChangeText={setText}
                        maxLength={30}
                        underlineColorAndroid="transparent"
                        placeholderTextColor={theme.tabBarInA}
                        autoFocus={true}
                        placeholder='minimum 3 letters'
                        returnKeyType='search'
                        multiline={false}
                    />
                    {text !== '' && (
                        <TouchableOpacity onPress={clearText}>
                            <MaterialCommunityIcons name="close-circle" size={20} color="gray" style={{ marginHorizontal: 8 }} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <View style={{ marginTop: 20 }}  >
                {
                    isLoading ? (
                        <ActivityIndicator size='small' />
                    ) : null
                }

                {
                    text.length > 2 && (
                        <View>
                            <Text style={{ color: theme.text, fontSize: 16, paddingLeft: 20 }}>{totalResults} results found for the movie '{text.toUpperCase()}'</Text>
                        </View>
                    )
                }
            </View>
            <View style={{ paddingTop: 20, paddingLeft: 20, flex: 1 }}>
                <FlatList
                    data={searchMovies}
                    renderItem={({ item, index }) => <RecentMovieItem item={item} index={index} theme={theme} />}
                    keyExtractor={(item, index) => item.id}
                //ListFooterComponent={renderLoader}

                />

                <MaterialCommunityIcons style={{
                    position: 'absolute',
                    top: deviceHeight-120,
                    left: deviceWidth-64,
                    zIndex: 1,
                    paddingRight: 20,
                    paddingBottom: 20
                }}
                    name='arrow-up-bold-circle' size={48} color={'#000'} />
            </View>

        </View>
    );
};


export default SearchMovie

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        top: 10,
        left: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    }
})
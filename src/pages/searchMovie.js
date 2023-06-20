import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Dimensions, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useRef } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../styles/themeMode';
import { useEffect } from 'react';
import { getSearchMovie, setSearchMovieClear, setSearchPageNumber } from '../redux/actions/searchMovieActions';
import RecentMovieItem from '../components/recentMovieItem';


const SearchMovie = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const totalPages = useSelector(state => state.searchMovieReducer.totalPages)
    const searchMovies = useSelector(state => state.searchMovieReducer.searchMovies)
    const totalResults = useSelector(state => state.searchMovieReducer.totalResults)
    const isLoading = useSelector(state => state.searchMovieReducer.isLoading)
    const pageNumber = useSelector(state => state.searchMovieReducer.pageNumber)

    const theme = route.params.theme
    const deviceWidth = Dimensions.get('window').width
    const _width = deviceWidth - 86
    const deviceHeight = Dimensions.get('window').height

    const flatListRef = useRef(null)

    const [text, setText] = useState('');

    const clearText = () => {
        setText('');
    };
    const handleChangeText = (inputText) => {
        dispatch(setSearchPageNumber(1))
        setText(inputText)
    }

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
                if (pageNumber === 1) {
                    dispatch(setSearchMovieClear());
                }
                dispatch(getSearchMovie(text, pageNumber));
            }, 500);
        }
        return () => clearTimeout(timeoutId);
    }, [text, pageNumber]);

    useEffect(() => {
        //console.log(searchMovies)
        console.log(pageNumber)
        //rconsole.log(totalPages)
        // console.log(totalResults)
    }, [searchMovies])

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

    const scrollToTop = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
    }

    const loadMoreItem = () => {
        if (!isLoading && pageNumber < totalPages) {
            dispatch(setSearchPageNumber(pageNumber + 1));
        }
    }

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
                        onChangeText={handleChangeText}
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
                {text.length > 2 && (
                    <View>
                        <Text style={{ color: theme.text, fontSize: 16, paddingLeft: 20 }}>{totalResults} results found for the movie '{text.toUpperCase()}'</Text>
                    </View>
                )}

            </View>

            <View style={{ paddingTop: 20, paddingLeft: 20, flex: 1 }}>
                <FlatList
                    ref={flatListRef}
                    data={searchMovies}
                    renderItem={({ item, index }) => <RecentMovieItem item={item} index={index} theme={theme} />}
                    keyExtractor={(item, index) => item.id}
                    ListFooterComponent={renderLoader}
                    onEndReached={loadMoreItem}
                    onEndReachedThreshold={0.5}
                />

                <TouchableWithoutFeedback onPress={scrollToTop}>
                    <MaterialCommunityIcons
                        style={{
                            position: 'absolute',
                            top: deviceHeight - 160,
                            left: deviceWidth - 70,
                            zIndex: 1,
                            padding: 10,
                            //backgroundColor: 'red'
                        }}
                        name='arrow-up-bold-circle' size={48} color={theme.text}
                    />
                </TouchableWithoutFeedback>
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
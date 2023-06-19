import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator, StatusBar, Dimensions } from 'react-native'
import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import RecentMovieItem from '../components/recentMovieItem'

import { darkTheme, lightTheme } from '../styles/themeMode'
import { useState } from 'react'
import { getRecentMovieAll, setRecentPageNumber } from '../redux/actions/recentMovieActions'
const RecentViewAll = ({ route }) => {

    const dispatch = useDispatch()
    const theme = route.params.theme

    const recentMoviesAll = useSelector(state => state.recentMovieReducer.recentMoviesAll)
    const pageNumber = useSelector(state => state.recentMovieReducer.pageNumber)
    const isLoading = useSelector(state => state.recentMovieReducer.isLoading)

    const flatListRef = useRef({ current: null });
    const screenHeight = Dimensions.get('window').height;
    const statusBarHeight = StatusBar.currentHeight;
    const scrollThreshold = screenHeight - (statusBarHeight + 400);
    const [scrollPosition, setScrollPosition] = useState(0);


    useEffect(() => {
        dispatch(getRecentMovieAll(pageNumber))
        //console.log("veri cekildi view no:" + pageNumber)
    }, [pageNumber])

    const loadMoreItem = () => {
        //setIsLoadingFooter(true)
        if (scrollPosition > scrollThreshold) {
            dispatch(setRecentPageNumber(pageNumber + 1))
            //console.log("viewno: " + pageNumber)
            const newPosition = scrollPosition + 1;
            setScrollPosition(newPosition);
            flatListRef.current.scrollToOffset({ offset: newPosition });
        }
    }

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

    return (
        <View style={{ paddingHorizontal: 10, flex: 1, backgroundColor: theme.bg }}>
            <FlatList
                ref={flatListRef}
                data={recentMoviesAll}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => <RecentMovieItem item={item} index={index} theme={theme} />}
                onEndReached={loadMoreItem}
                onEndReachedThreshold={0.8}
                ListFooterComponent={renderLoader}
                onScroll={(event) => setScrollPosition(event.nativeEvent.contentOffset.y.toFixed(0))}

            />
        </View>
    )
}

export default RecentViewAll

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
        backgroundColor: 'gray'
    },
})
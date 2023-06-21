import { StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, StatusBar, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { darkTheme, lightTheme } from '../styles/themeMode'
import { getPopularMovie, setPopularPageNumber, setPopularMovieClear } from '../redux/actions/popularMovieActions'
import { getRecentMovie, setRecentMovieClear, setRecentPageNumber } from '../redux/actions/recentMovieActions'
import { getGenre, setGenreName } from '../redux/actions/genreActions'
import { getThemeMode } from '../redux/actions/themeModeAction'

import PopularMovieItem from '../components/popularMovieItem'
import RecentMovieItem from '../components/recentMovieItem';
import { useNavigation } from '@react-navigation/native';

import SystemNavigationBar from 'react-native-system-navigation-bar';

import SplashScreen from 'react-native-splash-screen';
import { setSearchMovieClear } from '../redux/actions/searchMovieActions';

const Home = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch()

  //Popular Movies
  const popularMovies = useSelector(state => state.popularMovieReducer.popularMovies)
  const popularIsLoading = useSelector(state => state.popularMovieReducer.isLoading)
  //Recent Movies
  const recentMovies = useSelector(state => state.recentMovieReducer.recentMovies)
  const recentIsLoading = useSelector(state => state.recentMovieReducer.isLoading)
  //Genres 
  const genres = useSelector(state => state.genreReducer.genres)
  const genreIsLoading = useSelector(state => state.genreReducer.isLoading)
  const genresName = useSelector(state => state.genreReducer.genresName)
  //Theme Mode
  const themeMode = useSelector(state => state.themeModeReducer.themeMode)
  const theme = themeMode === 'dark' ? darkTheme : lightTheme

  //SplashScreen Setting
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  //BottomNavigationBar Theme Mode
  useEffect(() => {
    SystemNavigationBar.setNavigationColor(theme.bg, 'dark')
  }, [theme])

  //Get Popular Movies
  useEffect(() => {
    dispatch(getPopularMovie(1))
  }, [])

  //Get Recent Movies
  useEffect(() => {
    dispatch(getRecentMovie(1))
  }, [])

  //Get Genres
  useEffect(() => {
    dispatch(getGenre())
  }, [])

  //View More Setting for Popular Movies
  const loadMorePopular = () => {
    dispatch(setPopularMovieClear([]));
    dispatch(setPopularPageNumber(1));
  };

  //View More Setting for Recent Movies
  const loadMoreRecent = () => {
    dispatch(setRecentMovieClear([]))
    dispatch(setRecentPageNumber(1))
  }

  const loadSearch = () => {
    dispatch(setSearchMovieClear())
  };

  //const statusBarHeight = StatusBar.currentHeight;

  return (

    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} >
      <StatusBar backgroundColor={theme.bg} barStyle={theme.barStyle} />
      {popularIsLoading || recentIsLoading || genreIsLoading ? (
        <ActivityIndicator size={'large'} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} />
      ) : (
        <View style={[styles.container, { backgroundColor: theme.bg }]}>

          <View style={styles.header} >
            <Text style={[styles.title, { color: theme.text }]}> Movie Night </Text>
            <TouchableWithoutFeedback onPress={() => navigation.navigate("SearchMovie", { theme: theme }, loadSearch())}>
              <MaterialCommunityIcons name='magnify' size={24} color={theme.text} />
            </TouchableWithoutFeedback>
          </View>

          <ScrollView
            indicatorStyle='white'
            style={{ color: theme.text }}
          //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', paddingHorizontal: 10, marginBottom: 10 }}>
              <Text style={{ color: theme.text }}>Popular Movies</Text>
              <TouchableWithoutFeedback onPress={() => { navigation.navigate('PopularViewAll', { theme: theme }, loadMorePopular()) }} >
                <View style={{ flexDirection: "row", flexWrap: 'wrap', alignItems: 'center' }}>
                  <Text style={{ color: theme.text }}>View All</Text>
                  <MaterialCommunityIcons name='chevron-right' size={20} color={theme.text} />
                </View>
              </TouchableWithoutFeedback>
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", flex: 1, paddingLeft: 10 }} >
                {
                  popularMovies.map((item, index) => {
                    return <PopularMovieItem item={item} key={index} theme={theme.text}  />
                  })}
              </View>
            </ScrollView>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('RecentViewAll', { theme: theme }, loadMoreRecent())}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', paddingHorizontal: 10, marginVertical: 15 }}>
                <Text style={{ color: theme.text }}>Recent Movies</Text>
                <View style={{ flexDirection: "row", flexWrap: 'wrap', alignItems: 'center' }}>
                  <Text style={{ color: theme.text }}>View All</Text>
                  <MaterialCommunityIcons name='chevron-right' size={20} color={theme.text} />
                </View>
              </View>
            </TouchableWithoutFeedback>

            <View style={{ paddingHorizontal: 10 }}>
              {
                recentMovies.map((item, index) => {
                  return <RecentMovieItem item={item} key={index} theme={theme} genres={genres} />
                })}
            </View>
          </ScrollView>

        </View>
      )}

    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  }

})
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from 'react-native'
import React, { useState, useCallback } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChipGroup from '../components/chipGroup';
import TeaserTrailerItem from '../components/teaserTrailerItem';

import { getTeaserTrailer } from '../redux/actions/teaserTrailerActions'

import YoutubeIframe from 'react-native-youtube-iframe';

import { darkTheme, lightTheme } from '../styles/themeMode';

import { FavoriteDBService } from '../services/databaseServices';

import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import { getAllFavoriteMovie, movieDatabaseChanged } from '../redux/actions/favoriteMovieActions';
import Snackbar from 'react-native-snackbar';
const MovieDetail = ({ route, navigation }) => {

  //Get selected movie info 
  const movieItem = route.params.item

  //Get device properties
  const screenHeight = Dimensions.get('window').height;
  const screeWidht = Dimensions.get('window').width

  //Redux
  const dispatch = useDispatch()
  //Teaser
  const teaserTrailers = useSelector(state => state.teaserTrailerReducer.teaserTrailers)
  const isLoading = useSelector(state => state.teaserTrailerReducer.isLoading)
  //Theme
  const themeMode = useSelector(state => state.themeModeReducer.themeMode)
  const theme = themeMode === 'dark' ? darkTheme : lightTheme
  //Database
  const databaseChanged = useSelector(state => state.favoriteMovieReducer.databaseChanged)
  const favoriteMovies = useSelector(state => state.favoriteMovieReducer.favoriteMovies)
  const favoriteIsLoading = useSelector(state => state.favoriteMovieReducer.isLoading)
  //HOOKS
  const [modalVisible, setModalVisible] = useState(false)
  const [activeMovieVideoKey, setActiveMovieVideoKey] = useState('')
  const [availableFavorite, setAvailableFavorite] = useState(false)

  //Get Teaser and Trailer videos
  useEffect(() => {
    dispatch(getTeaserTrailer(movieItem.id))
  }, [movieItem.id])
  
  //Favorite
  useEffect(() => {
    //dispatch(getAllFavoriteMovie())
    //console.log(favoriteMovies.length)
    if (favoriteMovies) {
      const isMovieFavorite = favoriteMovies.some(res => res.id === movieItem.id)
      setAvailableFavorite(isMovieFavorite)
    }

  }, [movieItem.id])

  //StatusBar.setShowHideTransition('fade');

  const saveToFavorite = async () => {
    try {
      if (availableFavorite) {
        // await FavoriteDBService.deleteFavorite(movieItem.id)
        // dispatch(movieDatabaseChanged())
        // setAvailableFavorite(false)

        // showMessage({
        //   message: 'Movie successfully removed to favorite!',
        //   type: 'success',
        //   icon: 'success'
        // });

        showMessage({
          message: 'The movie has already been added to favorites!',
          type: 'warning',
          icon: 'warning'
        })


      } else {

        const response_backdrop_path = await fetch("https://image.tmdb.org/t/p/w500/" + movieItem.backdrop_path);
        const response_poster_path = await fetch("https://image.tmdb.org/t/p/w342" + movieItem.poster_path);
        const imageBlobBackdropPath = await response_backdrop_path.blob();
        const imageBlobPosterPath = await response_poster_path.blob();

        const readerBackdropPath = new FileReader();
        readerBackdropPath.readAsDataURL(imageBlobBackdropPath);

        readerBackdropPath.onloadend = async () => {
          const base64DataBackdropPath = readerBackdropPath.result;

          const readerPosterPath = new FileReader();
          readerPosterPath.readAsDataURL(imageBlobPosterPath);

          readerPosterPath.onloadend = async () => {
            const base64DataPosterPath = readerPosterPath.result;

            //id, title, overview, backdrop_path, poster_path, release_date, vote_average
            const newMovieId = await FavoriteDBService.insertFavorite(
              movieItem.id,
              movieItem.title,
              movieItem.overview,
              movieItem.backdrop_path == null ? null : (movieItem.backdrop_path.length > 100 ? movieItem.backdrop_path : base64DataBackdropPath),
              movieItem.poster_path == null ? null : (movieItem.poster_path.length > 100 ? movieItem.poster_path : base64DataPosterPath),
              movieItem.release_date,
              movieItem.vote_average
            );
            dispatch(movieDatabaseChanged())
            setAvailableFavorite(true)

            showMessage({
              message: 'Movie successfully added to favorite!',
              type: 'success',
              icon: 'success',
            })
            console.log('Yeni film ID:', newMovieId);

          }
        }
      }
    } catch (error) {
      showMessage({
        message: 'Movie Could not be Added/Removed to Favorites!',
        type: 'danger',
        icon: 'danger'
      })
      console.error('Film kaydedilemedi:', error.message);
    }
  }

  return (

    <View style={{ flex: 1, minHeight: screenHeight, backgroundColor: theme.bg }}>

      <FlashMessage position="bottom" />
      <StatusBar translucent backgroundColor="transparent" barStyle='light-content' />
      <Modal
        animationType='slide'
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setModalVisible(false)
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black'
          }}>

          <TouchableWithoutFeedback onPress={() => {
            setModalVisible(false)
          }}>
            <View
              style={{
                position: 'absolute',
                top: 40,
                left: 10,
                width: 48,
                height: 48,
                borderRadius: 10,
                backgroundColor: '#222',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <MaterialCommunityIcons name='close' size={20} color={"white"} />
            </View>
          </TouchableWithoutFeedback>

          <View style={{ width: '100%', transform: [{ rotate: "360deg" }] }}>
            <YoutubeIframe videoId={activeMovieVideoKey} height={240} play={true} />
          </View>

        </View>
      </Modal>

      <View  >
        {favoriteIsLoading && (
          <View style={{ position: 'absolute', zIndex: 1, justifyContent: 'center', alignItems: 'center', top: 0, bottom: 0, left: 0, right: 0 }}>
            <ActivityIndicator size='large' />
          </View>
        )}

        <ScrollView style={{ backgroundColor: theme.bg, minHeight: screenHeight }}>
          <TouchableWithoutFeedback onPress={() => navigation.pop()}>
            <MaterialCommunityIcons style={{
              position: 'absolute',
              top: 40,
              left: 10,
              zIndex: 1,
              paddingRight: 20,
              paddingBottom: 20,
              //backgroundColor:'red'
            }}
              name='chevron-left' size={32} color={'#fff'} />
          </TouchableWithoutFeedback>

          {movieItem.backdrop_path !== null ? (
            (movieItem.backdrop_path.length < 100) ? (
              <Image
                style={[styles.poster, { width: screeWidht }]}
                resizeMode='cover'
                source={{ uri: "https://image.tmdb.org/t/p/w500/" + movieItem.backdrop_path }}
              />
            ) : (
              <Image
                style={[styles.poster, { width: screeWidht }]}
                resizeMode='cover'
                source={{ uri: movieItem.backdrop_path }}
              />
            )
          ) : (
            <Image
              style={[styles.poster, { width: screeWidht, tintColor: 'white', backgroundColor: '#121212' }]}
              resizeMode='center'
              source={require("../assets/output-onlinepngtools.png")}
            />
          )}

          <TouchableWithoutFeedback onPress={() => saveToFavorite()}>
            <MaterialCommunityIcons style={{
              position: 'absolute',
              top: 40,
              left: screeWidht - 50,
              zIndex: 1,
              paddingRight: 20,
              paddingBottom: 20,
              //backgroundColor:'red'
            }}
              name='heart' size={32} color={availableFavorite ? 'red' : 'white'} />
          </TouchableWithoutFeedback>
          <View style={{ flex: 1, padding: 20, }}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'center', }}>
              <View style={{ flexWrap: 'wrap', flexDirection: 'column' }}>
                <Text style={[styles.title, { color: theme.text, width: screeWidht - 90 }]}>{movieItem.title}</Text>
                <Text style={{ color: theme.text }}>{movieItem.release_date}</Text>
              </View>
              <View style={{
                width: 48,
                height: 48,
                backgroundColor: theme.voteCircle,
                borderRadius: 24,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10
              }}>
                <Text style={{ color: theme.text, fontWeight: 'bold' }}>{(movieItem.vote_average).toFixed(1)}</Text>
              </View>
            </View>

            <ChipGroup />

            <Text style={[styles.header, { color: theme.text }]}>Overview</Text>
            <Text style={{ fontSize: 15, color: theme.text2 }}>{movieItem.overview}</Text>
            <Text style={[styles.header, { color: theme.text }]}>Teasers & Trailers</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {
                isLoading ? (
                  <ActivityIndicator size={'small'} style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 20 }} />) :

                  teaserTrailers.length > 0 ? (

                    teaserTrailers.map((item, index) => {
                      return (

                        <TeaserTrailerItem
                          key={item.key}
                          data={item}
                          poster={movieItem.backdrop_path}
                          itemIndex={index}
                          onPressFunction={() => { setModalVisible(true); setActiveMovieVideoKey(item.key) }}
                          theme={theme}
                        />
                      )
                    })
                  ) :
                    (
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                        <Image source={require("../assets/data.png")} style={{ tintColor: theme.text, width: 150, height: 150 }} />
                        <Text style={{ fontSize: 21, fontWeight: 'bold', paddingTop: 0, color: theme.text }}>No Data Available here!</Text>
                      </View>
                    )
              }
            </View>
          </View>
        </ScrollView>
      </View>

    </View>
  )
}

export default MovieDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  poster: {
    height: 281,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    //color: 'black',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    //color: 'black',
  }
})
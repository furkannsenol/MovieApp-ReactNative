import { StyleSheet, Text, View, Button, FlatList, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { darkTheme, lightTheme } from '../styles/themeMode'
import { FavoriteDBService } from '../services/databaseServices'
import { databaseService } from '../database/movieDB';
import { useNavigation } from '@react-navigation/native';
import { getAllFavoriteMovie } from '../redux/actions/favoriteMovieActions';
import { ActivityIndicator } from 'react-native-paper';
import { movieDatabaseChanged } from '../redux/actions/favoriteMovieActions';
import { SwipeListView } from 'react-native-swipe-list-view';
import RecentMovieItem from '../components/recentMovieItem';
import FavoriteMovieItem from '../components/favoriteMovieItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
import FlashMessage, { showMessage } from 'react-native-flash-message';
const Favorite = () => {

  const navigation = useNavigation()

  const dispatch = useDispatch()
  //Theme Mode
  const themeMode = useSelector(state => state.themeModeReducer.themeMode)
  const theme = themeMode === 'dark' ? darkTheme : lightTheme
  //Favorite
  const favoriteMovies = useSelector(state => state.favoriteMovieReducer.favoriteMovies)
  const favoriteIsLoading = useSelector(state => state.favoriteMovieReducer.isLoading)
  const databaseChanged = useSelector(state => state.favoriteMovieReducer.databaseChanged)


  useEffect(() => {
    dispatch(getAllFavoriteMovie())
    //console.log(favoriteMovies.length)
  }, [databaseChanged]);

  useEffect(() => {
    //console.log(favoriteMovies.length)
  }, [])

  // const fetchMovies = async () => {
  //   try {
  //     const fetchedMovies = await FavoriteDBService.getAllFavorites();
  //     setMovies(fetchedMovies);
  //   } catch (error) {
  //     console.error('Filmler alınamadı:', error.message);
  //   }
  // };

  // const handleDeleteMovie = async () => {
  //   try {
  //     await FavoriteDBService.deleteFavoriteTable();
  //     //fetchMovies();
  //     dispatch(movieDatabaseChanged())

  //     console.log("delete process success")
  //   } catch (error) {
  //     console.log("delete fail")
  //   }
  // }

  // const convertBlobToBase64 = (blob) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result);
  //     reader.onerror = reject;
  //     reader.readAsDataURL(blob);
  //   });
  // };

  // const handleSaveMovie = async () => {
  //   try {
  //     const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Aptenodytes_forsteri_-Snow_Hill_Island%2C_Antarctica_-adults_and_juvenile-8.jpg';
  //     const response = await fetch(imageUrl);
  //     const imageBlob = await response.blob();

  //     const reader = new FileReader();
  //     reader.readAsDataURL(imageBlob);
  //     reader.onloadend = async () => {
  //       const base64Data = reader.result;
  //       //id, title, overview, backdrop_path, poster_path, release_date, vote_average
  //       const newMovieId = await FavoriteDBService.insertFavorite(
  //         2,
  //         'Title',
  //         'overview',
  //         base64Data,
  //         base64Data,
  //         'release_date',
  //         2
  //       );
  //       dispatch(movieDatabaseChanged())
  //       console.log('Yeni film ID:', newMovieId);
  //     }
  //   } catch (error) {
  //     console.error('Film kaydedilemedi:', error.message);
  //   }
  // };

  const handleSelectedDeleteMovie = async (id) => {

    try {
      const deleteRows = await FavoriteDBService.deleteFavorite(id)
      //fetchMovies();
      showMessage({
        message: 'Movie successfully removed from favorites!',
        type: 'success',
        icon: 'success'
      })
      console.log("delete process success" + deleteRows)
      dispatch(movieDatabaseChanged())
    } catch (error) {
      console.log("delete fail")
    }
  }

  // const renderMovieItem = ({ item }) => (
  //   <TouchableWithoutFeedback onPress={() => navigation.navigate("MovieDetail", { item: item })}>
  //     <View style={{ flexDirection: 'row', marginTop: 10, paddingLeft: 10 }}>
  //       <View style={{ flexDirection: 'column' }}>
  //         <Image source={item.backdrop_path !== null ? { uri: item.backdrop_path } : require('../assets/no_image_available.jpg')} style={{ width: 150, height: 150 }} resizeMode='stretch' />
  //         <Image source={item.poster_path !== null ? { uri: item.poster_path } : require('../assets/no_image_available.jpg')} style={{ width: 150, height: 150 }} resizeMode='stretch' />
  //       </View>
  //       <View style={{ flexDirection: 'column', paddingLeft: 10, justifyContent: 'center', width: 230 }}>
  //         <Text style={{ color: theme.text }}>{item.id}</Text>
  //         <Text style={{ color: theme.text }}>{item.title}</Text>
  //         <Text style={{ color: theme.text }}>{item.overview}</Text>
  //         <Text style={{ color: theme.text }}>{item.release_date}</Text>
  //         <Text style={{ color: theme.text }}>{item.vote_average}</Text>
  //         <Text style={{ color: theme.text }}>{item.add_date}</Text>
  //         <Button title='Delete' onPress={() => handleSelectedDeleteMovie(item.id)}></Button>
  //       </View>
  //     </View>
  //   </TouchableWithoutFeedback>
  // );

  const renderHiddenItem = (data, rowMap) => (
    <TouchableWithoutFeedback
      style={[styles.backRightBtn, styles.backRightBtnRight]}
      onPress={() => handleSelectedDeleteMovie(data.item.id)}
    ><View style={styles.rowBack} >
        <MaterialCommunityIcons name="delete" size={32} color="white" />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      {
        //<Button title="Add Movie" onPress={handleSaveMovie} />
        //<Button title="Delete Table" onPress={handleDeleteMovie} />
      }
      {favoriteIsLoading && (
        <View style={{ position: 'absolute', zIndex: 1, justifyContent: 'center', alignItems: 'center', top: 0, bottom: 0, left: 0, right: 0 }}>
          <ActivityIndicator size='small' />
        </View>
      )}
      <FlashMessage position="bottom" />
      {
        favoriteMovies && favoriteMovies.length > 0 ? (
          <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
            <SwipeListView
              data={favoriteMovies}
              renderItem={({ item, index }) => <FavoriteMovieItem item={item} index={index} theme={theme} />}
              keyExtractor={(item) => item.id.toString()}
              rightOpenValue={-100}
              disableRightSwipe
              previewOpenValue={-40}
              previewOpenDelay={3000}

              renderHiddenItem={renderHiddenItem}
            />
          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Image source={require("../assets/data.png")} style={{ tintColor: theme.text, width: 250, height: 250 }} />
            <Text style={{ fontSize: 17, fontWeight: 'bold', paddingTop: 10, color: theme.text }}>You don't have any movies added yet</Text>
          </View>
        )
      }
    </View>
  )
}

export default Favorite

const styles = StyleSheet.create({
  rowBack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    paddingRight: 32,
    borderRadius: 10,
    backgroundColor: 'red'
  },
  backRightBtn: {
    height: '100%'
  }
})
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
  Dimensions
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

const MovieDetail = ({ route, navigation }) => {

  const movieItem = route.params.item

  const dispatch = useDispatch()

  const screenHeight = Dimensions.get('window').height;

  //Teaser
  const teaserTrailers = useSelector(state => state.teaserTrailerReducer.teaserTrailers)
  const isLoading = useSelector(state => state.teaserTrailerReducer.isLoading)

  //Theme
  const themeMode = useSelector(state => state.themeModeReducer.themeMode)
  const theme = themeMode === 'dark' ? darkTheme : lightTheme

  //HOOKS
  const [modalVisible, setModalVisible] = useState(false)
  const [activeMovieVideoKey, setActiveMovieVideoKey] = useState('')

  useEffect(() => {
    dispatch(getTeaserTrailer(movieItem.id))
  }, [movieItem.id])
  //StatusBar.setShowHideTransition('fade');


  return (

    <View style={{ flex: 1, minHeight: screenHeight,backgroundColor: theme.bg }}>
      <StatusBar translucent backgroundColor="transparent" />
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
        <ScrollView style={{ backgroundColor: theme.bg, minHeight: screenHeight }}>
          <TouchableWithoutFeedback onPress={() => navigation.pop()}>
            <MaterialCommunityIcons style={{
              position: 'absolute',
              top: 40,
              left: 10,
              zIndex: 1,
              paddingRight: 20,
              paddingBottom: 20
            }}
              name='chevron-left' size={32} color={'#fff'} />
          </TouchableWithoutFeedback>
          <Image style={styles.poster}
            resizeMode='cover'
            source={{
              uri: "https://image.tmdb.org/t/p/w500/" + movieItem.backdrop_path
            }} />
          <View style={{ flex: 1, padding: 20, }}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'center', }}>
              <View style={{ flexWrap: 'wrap', flexDirection: 'column' }}>
                <Text style={[styles.title, { color: theme.text }]}>{movieItem.title}</Text>
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
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
              {isLoading ? (
                <ActivityIndicator size={'small'} style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 20 }} />) :

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
    backgroundColor: 'gray'
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
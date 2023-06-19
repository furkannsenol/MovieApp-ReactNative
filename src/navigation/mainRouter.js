import { StyleSheet } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Router from './router'
import MovieDetail from '../pages/movieDetail'
import PopularViewAll from '../pages/popularViewAll';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../styles/themeMode';
import RecentViewAll from '../pages/recentViewAll';
import SearchMovie from '../pages/searchMovie';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator()

const MainRouter = () => {
  //Theme Mode
    const themeMode = useSelector(state => state.themeModeReducer.themeMode)
    const theme = themeMode === 'dark' ? darkTheme : lightTheme

    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Router'
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_bottom',
            }}
          >
          <Stack.Screen
            name='Router'
            component={Router}
          />
          <Stack.Screen
            name='MovieDetail'
            component={MovieDetail}
          />
          <Stack.Screen
            name='PopularViewAll'
            component={PopularViewAll}
            options={{
              headerShown: true,
              title: 'All Popular Movies',
              headerStyle: {
                backgroundColor: theme.bg
              },
              headerTintColor: theme.text,

            }}
          />
          <Stack.Screen
            name='RecentViewAll'
            component={RecentViewAll}
            options={{
              headerShown: true,
              title: 'All Recent Movies',
              headerStyle: {
                backgroundColor: theme.bg
              },
              headerTintColor: theme.text
            }}
          />
          <Stack.Screen
            name='SearchMovie'
            component={SearchMovie}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default MainRouter

const styles = StyleSheet.create({})
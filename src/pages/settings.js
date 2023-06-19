import { StyleSheet, Text, View, Switch, Button, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { darkTheme, lightTheme } from '../styles/themeMode'
import { getThemeMode } from '../redux/actions/themeModeAction'
import { useEffect } from 'react';

const Settings = () => {

  const dispatch = useDispatch();

  const themeMode = useSelector(state => state.themeModeReducer.themeMode)
  const themeIsLoading = useSelector(state => state.themeModeReducer.isLoading)

  const theme = themeMode === 'dark' ? darkTheme : lightTheme
  const switchValue = themeMode === 'dark' ? true : false

  handleThemeChange = () => {
    const newThemeValue = themeMode === 'dark' ? 'light' : 'dark'
    dispatch(getThemeMode(newThemeValue))
    //console.log(themeIsLoading)
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {themeIsLoading ? <ActivityIndicator size='large' /> : (

        <View style={{flexDirection:'row',alignItems:'center',}}>
          <Text style={{color:theme.text}}>Change theme mode </Text>
          <Switch
            value={switchValue}
            onValueChange={handleThemeChange}
          />

        </View>)}
    </View>
  )
}


export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
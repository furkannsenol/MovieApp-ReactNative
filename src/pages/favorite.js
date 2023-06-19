import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'

const Favorite = () => {
  return (
    <View>
      <Text>Favorite</Text>
      <Text>Favorite</Text>
      <Text>Favorite</Text>
      <TextInput
      placeholder='Deneme'
      clearButtonMode='unless-editing'
      label="email"
      mode='outlined'
      secureTextEntry
      right={<TextInput.Icon icon="eye" />}
      >

      </TextInput>
    </View>
  )
}

export default Favorite

const styles = StyleSheet.create({})
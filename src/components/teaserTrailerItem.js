import { StyleSheet, Text, View, Image, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

const TeaserTrailerItem = ({ data, poster, itemIndex, onPressFunction, theme }) => {
    const deviceWidth = Dimensions.get('window').width;
    const posterWidth = (deviceWidth - 40 - 10) / 2;
    const leftPositon = (posterWidth - 24) / 2
    const marginValue = itemIndex % 2 == 0 ? 10 : 0

    const thumbnail = "https://i.ytimg.com/vi/" + data.key + "/hqdefault.jpg"

    return (
        <TouchableWithoutFeedback onPress={() => onPressFunction()}>
            <View style={{ marginRight: marginValue, marginTop: 10 }}>
                <Image
                    style={{
                        position: 'absolute',
                        top: 38,
                        left: leftPositon,
                        zIndex: 1,
                        width: 24,
                        height: 24
                    }}
                    source={require("../assets/play-button.png")}
                />
                <Image
                    resizeMode='cover'
                    style={[styles.poster, { width: posterWidth }]}
                    source={{ uri: thumbnail }} />
                <Text style={{ textAlign: 'center', flexWrap: 'wrap', width: posterWidth, color: theme.text }}>{data.name}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default TeaserTrailerItem

const styles = StyleSheet.create({
    poster: {

        height: 100,
        borderRadius: 20,
        marginBottom: 5
    }
})
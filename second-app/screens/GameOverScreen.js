import React from 'react'
import { View, StyleSheet, Text, Button, Image } from 'react-native'

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          // fadeDuration={300}
          style={styles.image}
          source={require('../assets/images/final.jpg')}
          // source={{
          //   uri: 'https://pic2.zhimg.com/v2-d2463ca56aa8253227b1bb164ea74efd_b.jpg',
          // }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed{' '}
          <Text style={styles.highlight}>{props.roundsNumber}</Text>
          &nbsp;rounds to guess the number{' '}
          <Text style={styles.highlight}>{props.userNumber}</Text>
        </BodyText>
      </View>
      <MainButton onPress={props.onRestart} >NEW GAME</MainButton>
    </View>
  )
}

export default GameOverScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30,
  },
  resultContainer: {
    // width: '80%',
    marginHorizontal: 30,
    marginVertical: 15,
  },
  highlight: {
    color: Colors.danger,
    fontWeight: 'bold',
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20,
  },
})

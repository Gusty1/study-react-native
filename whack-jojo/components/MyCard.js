import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Card, Image } from '@rneui/themed'
import { Audio } from 'expo-av'

const MyCard = (props) => {
  const [isClick, setIsClick] = useState(props.item.show)

  const hitDioJudge = (data) => {
    if (data.item.show) {
      playSound()
      setIsClick(false)
      props.count()
    }
  }

  async function playSound () {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/musics/ola.mp3')
    )
    await sound.playAsync()
  }

  return (
    <Card containerStyle={styles.playCard}>
      <TouchableOpacity onPress={() => hitDioJudge(props)} activeOpacity={isClick ? 0.2 : 1}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={
            isClick
              ? require('../assets/images/dio.jpg')
              : require('../assets/images/error.png')
          }
        />
      </TouchableOpacity>
    </Card>
  )
}

export default MyCard

const styles = StyleSheet.create({
  playCard: {
    width: '30%',
    height: '26%',
    margin: 0,
    borderWidth: 1,
    borderColor: 'black',
    padding: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

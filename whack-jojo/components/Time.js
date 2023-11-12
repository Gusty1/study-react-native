import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Card } from '@rneui/themed'

import MyText from './MyText'
import Colors from '../constants/colors'

const Time = (props) => {
  return (
    <View style={styles.container}>
      <Card.Title style={styles.title}>
        <MyText style={styles.titleText}>時間</MyText>
      </Card.Title>
      <Card.Divider />
      <MyText style={styles.showText}>{props.gameTime}</MyText>
    </View>
  )
}

export default Time

const styles = StyleSheet.create({
  container: {
    width: '45%',
    backgroundColor: 'white',
    elevation: 8 /*android開啟陰影效果*/,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    borderRadius: 15,
  },
  showText: {
    textAlign: 'center',
    fontSize: 16,
    paddingBottom: 10,
    color: Colors.second,
  },
  titleText: {
    fontSize: 18,
  },
  title: {
    paddingTop: 10,
  },
})

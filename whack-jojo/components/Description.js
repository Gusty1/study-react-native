import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider } from '@rneui/themed'

import MyText from './MyText'
import Colors from '../constants/colors'

const Description = (props) => {
  return (
    <View style={styles.desContainer}>
      <MyText style={styles.title}>緣起:</MyText>
      <MyText>學習React Native的練習</MyText>
      <MyText>以前有用過原生Android寫過類似的，但時過境遷，人還在，可是程式已經不在了，
        所以就順便借這次學習的機會當練習。
      </MyText>
      <Divider />
      <MyText style={styles.title}>遊戲說明:</MyText>
      <MyText>猴子都會了，還要我說?</MyText>
      <Divider />
      <MyText style={styles.title}>提醒:</MyText>
      <MyText>這遊戲是有聲音的。</MyText>
    </View>
  )
}

export default Description

const styles = StyleSheet.create({
  desContainer: {
    marginVertical: '20%',
    marginHorizontal: '5%',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 15,
    padding: 20,
    backgroundColor: 'white',
    elevation: 8, /*android開啟陰影效果*/
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
  }, title: {
    color: Colors.primary,
    fontSize: 14,
  }
})

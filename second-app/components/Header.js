import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../constants/colors'
import TitleText from './TitleText'

const Header = (props) => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.headerTitle}>{props.title}</TitleText>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '10%',
    // paddingTop: '5%',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // headerTitle: {
  //   fontSize: 18,
  //   fontFamily: 'Playpen-Sans'
  // },
})

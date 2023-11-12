import React from "react"
import { StyleSheet, Text } from 'react-native'

const MyText = (props) => {
  return <Text style={{ ...props.style, ...styles.myText }}>{props.children}</Text>
}

export default MyText

const styles = StyleSheet.create({
  myText: {
    fontWeight: 'bold',
    fontFamily: 'noto-sans',
  }
})
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const GoalItem = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onDelete(props.id)}>
      <View style={styles.textStyle}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    marginBottom: 5,
    padding: 10,
    color: 'red',
    backgroundColor: 'yellow',
    borderColor: 'black',
    borderWidth: 1,
  },
})

export default GoalItem

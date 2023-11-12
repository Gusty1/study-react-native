import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Button, Modal } from 'react-native'

const GoalInput = (props) => {
  const [enterText, setEnterText] = useState('')

  const textInputHandler = (text) => {
    setEnterText(text)
  }

  const addGoalHandler = () => {
    props.onAddGoal(enterText)
  }

  return (
    <Modal visible={props.visible} animationType="fade">
      <View style={styles.sonContainer1}>
        <TextInput
          placeholder="測試輸入框"
          style={styles.inputStyle}
          onChangeText={textInputHandler}
        />
        <View style={styles.buttonContainer}>
          <Button title="cancel" color={'red'} onPress={props.onCancel} />
          <Button title="add" onPress={addGoalHandler}></Button>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    borderColor: 'red',
    // flex: 1,
    backgroundColor: 'green',
    marginRight: 5,
    width: '80%',
    borderRadius: 10,
  },
  sonContainer1: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
})

export default GoalInput

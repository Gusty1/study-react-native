import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefaultStyles from '../constants/default-styles'
import BodyText from '../components/BodyText'

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min) + min)
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

const renderListItem = (listLength, itemData) => {
  return (
    <View style={styles.listItem}>
      <BodyText>#{listLength - itemData.index}</BodyText>
      <BodyText>{itemData.item}</BodyText>
    </View>
  )
}

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [pastGuess, setPastGuess] = useState([initialGuess.toString()])
  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  const { userChoice, onGameOver } = props

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuess.length)
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Okay', style: 'cancel' },
      ])
      return
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    )
    setCurrentGuess(nextNumber)
    // setRounds((curRounds) => curRounds + 1)
    setPastGuess((curPastGuess) => [nextNumber.toString(), ...curPastGuess])
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button
          title="lower"
          onPress={() => {
            nextGuessHandler('lower')
          }}
        />
        <Button
          title="GREATER"
          onPress={() => {
            nextGuessHandler('greater')
          }}
        />
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuess.map((guess, index) =>
            renderListItem(guess, pastGuess.length - index)
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuess}
          renderItem={(item) => {
            return renderListItem(pastGuess.length, item)
          }}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '80%',
  },
  listItem: {
    borderColor: 'black',
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'yellow',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  listContainer: {
    width: '60%',
    flex: 1,
  },
  list: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end',
  },
})

import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'

import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

export default function App () {
  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare () {
      try {
        await Font.loadAsync({
          'Playpen-Sans': require('./assets/fonts/PlaypenSans-VariableFont_wght.ttf'),
        })
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync()
  }, [appIsReady])

  if (!appIsReady) return null

  const configureNewGameHandler = () => {
    setGuessRounds(0)
    setUserNumber(null)
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber)
    setGuessRounds(0)
  }

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds)
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    )
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    )
  }

  return (
    <View style={styles.screen} onLayout={onLayoutRootView}>
      <Header title={'Guess a Number'} />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: '11%',
    flex: 1,
  },
})

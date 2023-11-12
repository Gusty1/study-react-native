import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  StyleSheet,
  View,
  DrawerLayoutAndroid,
  PanResponder,
} from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { Button, Dialog } from '@rneui/themed'
import uuid from 'react-native-uuid'

import MyHeader from './components/MyHeader'
import Description from './components/Description'
import MyCard from './components/MyCard'
import Time from './components/Time'
import Score from './components/Score'
import MyText from './components/MyText'
import Colors from './constants/colors'

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  const [gameTime, setGameTime] = useState(0)
  const [isStart, setIsStart] = useState(false)
  const [cardAry, setCardAry] = useState(generateCardAry())
  const drawer = useRef(null)
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          drawer.current.openDrawer()
        }
      },
    })
  ).current

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'noto-sans': require('./assets/fonts/NotoSansTC-VariableFont_wght.ttf'),
        })
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  useEffect(() => {
    if (gameTime > 0) {
      setTimeout(() => setGameTime(gameTime - 1), 1000)
      setTimeout(() => setCardAry(generateCardAry()), 1000)
    }
  }, [gameTime])

  useEffect(() => {
    if (!isStart) setGameScore(0)
  }, [isStart])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync()
  }, [appIsReady])

  if (!appIsReady) return null

  const startGame = () => {
    setGameTime(30)
    setIsStart(true)
  }

  const countScore = () => {
    setGameScore(gameScore + 10)
  }

  function generateCardAry() {
    const newCardAry = []
    let showCount = 0
    for (let i = 0; i < 9; i++) {
      let showNumber = Math.floor(Math.random() * 2)
      if (showNumber === 1) showCount++
      newCardAry.push({
        show: showNumber === 1 && showCount <= 5 ? true : false,
        key: uuid.v4(),
      })
    }
    return [...newCardAry]
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={'left'}
        renderNavigationView={Description}>
        <MyHeader drawer={drawer} />
        <View style={styles.mainContainer} {...panResponder.panHandlers}>
          <View style={styles.showContainer}>
            <Time gameTime={gameTime} />
            <Score gameScore={gameScore} />
          </View>
          <View style={styles.buttonContainers}>
            {gameTime === 0 ? (
              <Button size="md" title={'Start'} onPress={startGame} />
            ) : null}
          </View>
          <View style={styles.playContainer}>
            {gameTime === 0
              ? null
              : cardAry.map((item) => {
                  return (
                    <MyCard item={item} key={item.key} count={countScore} />
                  )
                })}
            {/* {cardAry.map((item) => {
            return <MyCard item={item} key={item.key} count={countScore} />
          })} */}
          </View>
        </View>

        <Dialog
          isVisible={isStart && gameTime === 0}
          onBackdropPress={() => {
            setIsStart(false)
          }}>
          <Dialog.Title title="遊戲結束" />
          <MyText>
            總分: <MyText style={styles.finalScore}>{gameScore}</MyText>
          </MyText>
        </Dialog>
      </DrawerLayoutAndroid>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  showContainer: {
    marginVertical: '5%',
    marginHorizontal: '10%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  playContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: '10%',
  },
  buttonContainers: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  finalScore: {
    color: Colors.second,
  },
})

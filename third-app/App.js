import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { enableScreens } from 'react-native-screens'

import MealsNavigator from './navigation/MealsNavigator'

enableScreens()

export default function App () {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare () {
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

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync()
  }, [appIsReady])

  if (!appIsReady) return null

  return <MealsNavigator />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  testFont: {
    fontWeight: 'bold',
    fontFamily: 'noto-sans',
  },
})

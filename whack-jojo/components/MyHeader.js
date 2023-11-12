import React from 'react'
import { StyleSheet } from 'react-native'
import { Header } from '@rneui/themed'

const MyHeader = (props) => {

  const showLeftDrawer = () => {
    props.drawer.current.openDrawer()
  }

  return (
    <Header
      backgroundImageStyle={{}}
      barStyle="default"
      centerComponent={{
        text: 'WHACK-JOJO',
        style: { fontWeight: 'bold', fontSize: 18 },
      }}
      centerContainerStyle={{}}
      containerStyle={{ width: '100%', paddingTop: '13%' }}
      leftComponent={{ icon: 'menu', onPress: showLeftDrawer }}
      leftContainerStyle={{}}
      linearGradientProps={{}}
      placement="center"
      rightContainerStyle={{}}
      statusBarProps={{}}
    />
  )
}

export default MyHeader

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

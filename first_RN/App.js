import React, { useState } from 'react'
import { StyleSheet, View, Button, FlatList } from 'react-native'
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

export default function App() {
  const [courseGoals, setCourseGoals] = useState([])
  const [isAddModal, setIsAddModal] = useState(false)

  const addTextHandler = (textTitle) => {
    console.log(textTitle)
    setCourseGoals([
      ...courseGoals,
      { key: Math.random().toString(), value: textTitle },
    ])
  }

  const removeGoalHandler = (goalKey) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.key !== goalKey)
    })
  }

  const cancelGoalHandler = () => {
    setIsAddModal(!isAddModal)
  }

  return (
    <View style={styles.mainContainer}>
      <Button title="add new Goal" onPress={() => setIsAddModal(!isAddModal)} />
      <GoalInput
        onAddGoal={addTextHandler}
        visible={isAddModal}
        onCancel={cancelGoalHandler}
      />
      {/* <ScrollView >
        {courseGoals.map((course) => {
          return <View key={course} style={styles.textStyle}><Text key={course}>{course}</Text></View>
        })}
      </ScrollView> */}
      <FlatList
        keyExtractor={(item, index) => item.key}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.key}
            title={itemData.item.value}
            onDelete={removeGoalHandler}
          />
        )}
      />
      {/**flex測試 */}
      {/* <View style={styles.testFlex}>
        <Text style={{ backgroundColor: 'blue', flex: 1 }}>1</Text>
        <Text style={{ backgroundColor: 'yellow', flex: 1 }}>2</Text>
        <Text style={{ backgroundColor: 'red', flex: 1 }}>3</Text>
      </View> */}
    </View>
  )
}

/**
 * react native的css推薦要這樣弄
 * 一個StyleSheet json 裡面放各種組件的css
 */
const styles = StyleSheet.create({
  // testFlex: {
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center', //文字和寬度置中對其
  // },
  mainContainer: {
    padding: 50,
  },
})

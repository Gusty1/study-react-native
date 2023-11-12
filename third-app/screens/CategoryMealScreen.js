import React from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'

import { MEALS } from '../data/dummy.data'
import MealList from '../components/MealList'
const CategoryMealScreen = (props) => {
  const catId = props.route.params.categoryId

  const displayedMeals = MEALS.filter((meal) => {
    return meal.categoryIds.indexOf(catId) >= 0
  })

  return <MealList listData={displayedMeals} navigation={props.navigation} />
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
})

export default CategoryMealScreen

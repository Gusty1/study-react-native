import React from 'react'
import { Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'

import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealScreen from '../screens/CategoryMealScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import Colors from '../constants/Colors'
import { CATEGORIES, MEALS } from '../data/dummy.data'
import HeaderButton from '../components/HeaderButton'
import FavoriteScreen from '../screens/FavoritesScreen'
import FilterScree from '../screens/FilterScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const myHeaderStyle = {
  headerStyle: {
    backgroundColor: Colors.primaryColor,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTintColor: Colors.headerColor,
  headerTitleAlign: 'center',
  // headerShown: false,
}

const myBottomTabStyle = {
  tabBarActiveTintColor: Colors.primaryColor,
  tabBarInactiveTintColor: 'black',
  tabBarShowLabel: false,
  tabBarStyle: {
    // height: '8%',
    backgroundColor: Colors.accentColor,
  },
}

function MyHomeStack() {
  return (
    <Stack.Navigator screenOptions={{ ...myHeaderStyle }}>
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'Meal Categories',
        }}
      />
      <Stack.Screen
        name="CategoryMeals"
        component={CategoryMealScreen}
        options={({ route }) => {
          const catId = route.params.categoryId
          const selectedCategory = CATEGORIES.find((cat) => cat.id === catId)

          return {
            title: selectedCategory.title,
          }
        }}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({ route }) => {
          const mealId = route.params.mealId
          const selectedMeal = MEALS.find((meal) => meal.id === mealId)

          return {
            title: selectedMeal.title,
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  key={'h1'}
                  title="Favorite"
                  iconName="star"
                  onPress={() => {
                    return console.log('favorite')
                  }}
                />
              </HeaderButtons>
            ),
          }
        }}
      />
    </Stack.Navigator>
  )
}

function MyFavoriteStack() {
  return (
    <Stack.Navigator screenOptions={{ ...myHeaderStyle }}>
      <Stack.Screen name="FavoriteHome" component={FavoriteScreen} />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({ route }) => {
          const mealId = route.params.mealId
          const selectedMeal = MEALS.find((meal) => meal.id === mealId)

          return {
            title: selectedMeal.title,
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  key={'h1'}
                  title="Favorite"
                  iconName="star"
                  onPress={() => {
                    return console.log('favorite')
                  }}
                />
              </HeaderButtons>
            ),
          }
        }}
      />
    </Stack.Navigator>
  )
}

function MyDrawerNavigate() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
      }}>
      <Drawer.Screen name="MyHome" component={MyHomeStack} />
      <Drawer.Screen name="Filter" component={FilterScree} />
    </Drawer.Navigator>
  )
}

function MealsNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{ ...myBottomTabStyle }}>
        <Tab.Screen
          name="Home"
          component={MyDrawerNavigate}
          options={{
            tabBarIcon: (props) => {
              if (props.focused)
                return (
                  <Ionicons name="home" size={props.size} color={props.color} />
                )
              else return <Ionicons name="home-outline" size={props.size} />
            },
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={MyFavoriteStack}
          options={{
            tabBarIcon: (props) => {
              if (props.focused)
                return (
                  <Ionicons
                    name="heart"
                    size={props.size}
                    color={props.color}
                  />
                )
              else return <Ionicons name="heart-outline" size={props.size} />
            },
            headerShown: false,
            ...myHeaderStyle,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default MealsNavigator

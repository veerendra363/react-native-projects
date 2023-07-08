import { FlatList, StyleSheet, Text, View } from "react-native"
import { CATEGORIES, MEALS } from "../data/dummy-data"
import MealItem from "../components/MealItem"
import {  useLayoutEffect } from "react"

function MealsOverviewScreen({ route, navigation }) {
  const catId = route.params.categoryId

  const displayedMeals = MEALS.filter((mealItem) =>
    mealItem.categoryIds.includes(catId),
  )

  useLayoutEffect(() => {
    /*
      New: useEffect executes the code after rendering of the page.
      Here we want our code needs no render along with rendering of the page.
      So we are using the useLayoutEffect  hook.
      It is same like useEffect but executes the code along the rendering.
    */
    const categoryTitle = CATEGORIES.find((category) => category.id === catId).title

    navigation.setOptions({
      title: categoryTitle,
    })
  }, [catId, navigation])


  function renderMealItem(itemData) {
    return <MealItem
        id = {itemData.item.id}
          title={itemData.item.title}
          imageUrl={itemData.item.imageUrl}
          affordability={itemData.item.affordability}
          complexity={itemData.item.complexity }
        duration={itemData.item.duration}
      />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  )
}

export default MealsOverviewScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})

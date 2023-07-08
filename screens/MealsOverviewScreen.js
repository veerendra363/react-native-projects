import { CATEGORIES, MEALS } from "../data/dummy-data"
import {  useLayoutEffect } from "react"
import MealsList from "../components/MealsList"

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

return <MealsList items={displayedMeals} />
  
}

export default MealsOverviewScreen



import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FavoritesContext } from '../store/context/favorites-context';
import { MEALS } from '../data/dummy-data';
import MealsList from '../components/MealsList';

function FavoritesScreen() {
  const favMealsCtx = useContext(FavoritesContext)

  const favMeals = MEALS.filter(meal => favMealsCtx.ids.includes(meal.id))

  if (favMeals.length === 0) {
    return (<View style={styles.rootContainer}>
      <Text style={styles.text}>You have no favorite meals yet.</Text>
    </View>)
  }

  return <MealsList items={favMeals} />
}

export default FavoritesScreen;

const styles = StyleSheet.create({

  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }

})

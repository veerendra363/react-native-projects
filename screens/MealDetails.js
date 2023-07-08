import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { MEALS } from "../data/dummy-data"
import MealBasicDetails from "../components/MealBasicDetails"
import { useLayoutEffect } from "react"
import IconButton from "../components/IconButton"

function MealDetails({ route, navigation }) {
  const mealId = route.params.mealId

    const selectedMeal = MEALS.find((meal) => meal.id === mealId)

    function headerButtonPressHandler() {
        console.log('Pressed!')
    }
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton icon="star" color="white" onPress={headerButtonPressHandler}/>
            }
        })
     }
        , [])

  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealBasicDetails
        duration={selectedMeal.duration}
        affordability={selectedMeal.affordability}
        complexity={selectedMeal.complexity}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Ingredients</Text>
          </View>

          {selectedMeal.ingredients.map((ingredient) => (
            <View key={ingredient} style={styles.listItemContainer}>
              <Text style={styles.listItem}>{ingredient}</Text>
            </View>
          ))}
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Steps</Text>
          </View>

          {selectedMeal.steps.map((step) => (
            <View style={styles.listItemContainer} key={step}>
              <Text style={styles.listItem}>{step}</Text>
            </View>
          ))}
        </View>
      </View>
      </ScrollView>
  )
}

export default MealDetails

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32
    },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  subtitle: {
    color: "#ecdcd2",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitleContainer: {
    marginHorizontal: 12,
    marginVertical: 4,
    padding: 6,
    borderBottomColor: "#ecdcd2",
    borderBottomWidth: 2,
  },
  listItemContainer: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 12,
    marginVertical: 4,
    backgroundColor: "#e2b497",
  },
  listItem: {
    color: "#352501",
    textAlign: "center",
    },
    listContainer: {
      width: '80%'
    },
    listOuterContainer: {
        alignItems: 'center'
    }
})

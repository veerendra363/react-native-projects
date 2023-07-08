import { FlatList, StyleSheet, View } from "react-native"
import MealItem from "./MealItem"

export default function MealsList({ items }) {
    function renderMealItem(itemData) {
      return (
        <MealItem
          id={itemData.item.id}
          title={itemData.item.title}
          imageUrl={itemData.item.imageUrl}
          affordability={itemData.item.affordability}
          complexity={itemData.item.complexity}
          duration={itemData.item.duration}
        />
      )
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderMealItem}
        />
      </View>
    )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
})

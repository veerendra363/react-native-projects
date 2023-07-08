import { FlatList, StyleSheet, View } from "react-native"
import { CATEGORIES } from "../data/dummy-data"
import CategoryGrideTile from "../components/CategoryGridTile"

function CategoriesScreen({ navigation }) {
function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("MealsOverview", {categoryId: itemData.item.id})
  }
  return (
    <CategoryGrideTile
      title={itemData.item.title}
      color={itemData.item.color}
      onPress={pressHandler}
    />
  )
}
  return (
    <View>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
      ></FlatList>
    </View>
  )
}

export default CategoriesScreen

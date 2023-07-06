/*
  This is a custom component to hold the guessed numbers.
  The data which is passed between the tags <NumberContainer> data </NumberContainer> comes the children prop.
*/

import { Text, View, StyleSheet } from "react-native"
import { colors } from "../../utils/colors"

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  )
}

export default NumberContainer

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: colors.accent500,
    padding: 24,
    borderRadius: 8,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: colors.accent500,
    fontSize: 36,
    fontWeight: "bold",
  },
})

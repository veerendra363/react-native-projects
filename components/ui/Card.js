/*
  This is custom card component.
  To create shadow effect
    - in android we use elevation style attribute
    - in ios we use shadowColor, shadowOffset, shadowRadius, ShadowOpacity style attribute
*/
import { StyleSheet, View } from "react-native"

function Card({ children }) {
  return <View style={styles.cardStyles}>{children}</View>
}

export default Card

const styles = StyleSheet.create({
  cardStyles: {
    alignItems: "center",
    marginTop: 36,
    padding: 16,
    backgroundColor: "#4e0329",
    marginHorizontal: 24,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
})

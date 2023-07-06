/*
    Custom button creates using basic native component like pressable, view, text and styling.
    pressable style takes function also and that function gets any object with pressed boolean attribute. pressed is true if user press the 
    area where pressable component is rendered otherwise it is false.
    So, by using that pressed data we can create the some effects in the pressed area.
*/
import { Text, View, Pressable, StyleSheet } from "react-native"

function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed
            ? [styles.pressed, styles.buttonInnerContainer]
            : styles.buttonInnerContainer
        }
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: "#86325cff",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  buttonText: {
    textAlign: "center",
    color: "white",
  },

  pressed: {
    opacity: 0.75,
  },
})

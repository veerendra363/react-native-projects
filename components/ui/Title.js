/*
  This is custom title component. here we get the title as 
  children prop which means title is given between the tags.

  New: Platform is used to find the app is running in which platform.
  By using this we can style according to platform.
*/

import { Platform, StyleSheet, Text } from "react-native"

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>
}

export default Title

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    borderWidth: Platform.OS === "android" ? 2 : 0,
    padding: 12,
    borderColor: "white",
    maxWidth: "95%",
  },
})

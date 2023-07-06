/*
  This is custom title component. here we get the title as 
  children prop which means title is given between the tags.
*/

import { StyleSheet, Text } from "react-native"

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
    borderWidth: 2,
    padding: 12,
    borderColor: "white",
  },
})

/* 
  Custom component to display the instruction text which is given between the tags.
  The data given between the tags comes as children prop.
  If we don't want the styling which is given to the component then we can change it using style prop of the component.
  For style prop of react native components takes object or array. In the array the last styles will overrides the all front to it.
  So, to highest priority to styles which are coming from the parent component here we kept it last in the style array of Text component.
*/

import { StyleSheet, Text } from "react-native"
import { colors } from "../../utils/colors"

function InstructionText({children, style}) {
    return <Text style={[styles.textColor, style]}>{children}</Text>
}

export default InstructionText
 
const styles = StyleSheet.create({
  textColor: {
    color: colors.accent500,
    fontSize: 24,
  }
})
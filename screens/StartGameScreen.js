/*
  Starting Screen of the Game
  It contains input and two buttons
  If user Enters the valid number then he/she will be moved to the game screen where they
  play actual game with the app.
*/
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
  Platform
} from "react-native"
import PrimaryButton from "../components/ui/PrimaryButton"
import { useState } from "react"
import Title from "../components/ui/Title"
import { colors } from "../utils/colors"
import Card from "../components/ui/Card"
import InstructionText from "../components/ui/InstructionText"

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("")

  // it is used to get the dimensions of the device
  const { width, height } = useWindowDimensions()

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText)
  }

  function resetInputHandler() {
    setEnteredNumber("")
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber)
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      /* 
        This react native Alert uses the native alerts of the platforms
        issue: [{test: 'Okay', style: 'destructive', onPress: resetInputHandler}], initial i given this as 
        only object it is breaking the application in android instead of creating alert message then 
        after some google searches i found that we have to add that object in an array. finally this solution is
        working in both ios and android.

        New: Here we are using the useWindowDimensions hook to get dynamic dimensions of the device. use this
        we can adjust the screen according to orientation changes (landscape, portrait.. )

        New + Issue: In android  we get collapsable keyboard where in case of ios we can't collapse the keyboard
        It will occupy the screen and user can't able to see the screen. To solve this react native provides KeyboardAvoidingView
        Component with this we can collapse the keyboard. We have wrap the code in this component. It will move our screen to above
        and in bottom we get keyboard where our actually screen go out the device. To make it visible use scroll view then we can 
        scroll between the our screen and keyboard or if we click any where on the screen it will collapse the screen.
       */
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99",
        [{ test: "Okay", style: "destructive", onPress: resetInputHandler }],
      )
      return
    }
    onPickNumber(enteredNumber)
  }

  const marginTop = height < 400 ? 32 : 100

  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
        <View style={[styles.rootContainer, { marginTop }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              value={enteredNumber}
              onChangeText={numberInputHandler}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default StartGameScreen

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },

  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: "#ddb52f",
    borderBottomWidth: 2,
    color: "#ddb52f",
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonsContainer: {
    flexDirection: "row",
  },

  buttonContainer: {
    flex: 1,
  },
})

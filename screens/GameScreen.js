/*
  Main game screen where phone or app starts guess the number and 
  we will tall whether is high or low then our number to app.
  Based on our input if will decrease the range of guess and from that range it will pick one.
  While its guessing we will display the all list of the guesses which are made by the app.
  If guess is correct we will move to the game over screen.
*/

import { Alert, FlatList, StyleSheet, Text, View } from "react-native"
import { useState, useEffect } from "react"
import { Ionicons } from "@expo/vector-icons"
import Title from "../components/ui/Title"
import NumberContainer from "../components/game/NumberContainer"
import PrimaryButton from "../components/ui/PrimaryButton"
import InstructionText from "../components/ui/InstructionText"
import Card from "../components/ui/Card"
import { colors } from "../utils/colors"

function generateRandomBetween(min, max, exclude) {
  /* range of guess -> (min, max) max is excluded.
     exclude -> this is already guessed number we what exclude it from the range and
     we are not allowing it to guess the number first. when we are calling the app first time
     we are passing userNumber as exclude.so, it is never able to guess the number first time.
  */
  const rndNum = Math.floor(Math.random() * (max - min)) + min

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}
let minBoundary = 1
let maxBoundary = 100

function GameScreen({ userNumber, onGameOver, updateRounds }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [guessedNumbers, setGuessedNumbers] = useState([])

  useEffect(() => {
    console.log(minBoundary, maxBoundary)
    if (currentGuess == userNumber) {
      minBoundary = 1
      maxBoundary = 100
      updateRounds(guessedNumbers.length)
      onGameOver()
    }
  }, [currentGuess, userNumber, onGameOver])

  function nextGuessHandler(direction) {
    // direction => lower or higher
    if (
      (direction === "lower" && currentGuess < parseInt(userNumber)) ||
      (direction === "higher" && currentGuess > parseInt(userNumber))
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        {
          text: "Sorry!",
          style: "cancel",
          onPress: () => {},
        },
      ])
      return
    }
    if (direction === "lower") {
      maxBoundary = currentGuess
    } else {
      minBoundary = currentGuess + 1
    }
    guessedNumbersHandler(currentGuess)
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess,
    )
    setCurrentGuess(newRndNumber)
  }

  function guessedNumbersHandler(prevNum) {
    setGuessedNumbers((guessedNumbers) => [
      { guess: prevNum, key: prevNum },
      ...guessedNumbers,
    ])
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionStyles}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          style={{ marginTop: 16 }}
          data={guessedNumbers}
          renderItem={(itemData) => (
            <View style={styles.listItem}>
              <Text style={styles.listText}>{`#${
                guessedNumbers.length - itemData.index 
              }   Guessed Number is ${itemData.item.guess}`}</Text>
            </View>
          )}
        ></FlatList>
      </View>
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  instructionStyles: {
    marginBottom: 24,
  },
  listItem: {
    backgroundColor: colors.accent500,
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 2,
    padding: 8,
    marginBottom: 8,
    fontSize: 24,
  },
  listText: {
    textAlign: "center",
    color: "#4e0376",
  },
  listContainer: {
    flex: 1,
    marginBottom: 16,
  },
})

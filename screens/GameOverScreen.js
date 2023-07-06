/*
  Game over screen displays title, image, summary of the game, and New Game button. 
 */

import { Image, StyleSheet, Text, View } from "react-native"
import Title from "../components/ui/Title"
import { colors } from "../utils/colors"
import PrimaryButton from "../components/ui/PrimaryButton"

function GameOverScreen({ roundNumber, userNumber, onGameStart }) {
  /*
    roundNumber => no.of guesses taken by phone to find the correct number
    userNumber => user entered number
    onGameStart => function which is used to set all values to initial values in the app component.

    if user press the New Game button then onGameStart will be called. user will be displayed with start game screen
  */
  return (
    <View style={styles.root}>
      <Title>Game Over</Title>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/dice.jpeg")}
          style={styles.image}
        />
        <Text style={styles.summary}>
                  Your phone needed <Text style={styles.numberStyle}>{ roundNumber}</Text> rounds to
          guess the number
                  <Text style={styles.numberStyle}>{ userNumber}</Text>
        </Text>
          </View>
          <PrimaryButton onPress={onGameStart}>New Game</PrimaryButton>
    </View>
  )
}

export default GameOverScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    container: {
        marginTop: 24,
        justifyContent: 'center',
        alignContent: 'center'
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    summary: {
        fontSize: 24,
        color: 'white',
        alignContent: 'center',
        textAlign: 'center',
        marginVertical: 16
    },
    numberStyle: {
        fontWeight: 'bold',
        color: colors.accent500
    }
})

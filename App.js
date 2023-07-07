import { StyleSheet, ImageBackground, SafeAreaView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"

import GameScreen from "./screens/GameScreen"
import GameOverScreen from "./screens/GameOverScreen"
import StartGameScreen from "./screens/StartGameScreen"
import { StatusBar } from "expo-status-bar"

export default function App() {
  // userNumber stores the user entered number.
  const [userNumber, setUserNumber] = useState()

  // gameIsOver is boolean variable if game is over then its is set true otherwise it is false
  const [gameIsOver, setGameIsOver] = useState(false)

  // rounds stores the number of guess taken by the phone to find the user entered number
  const [rounds, setRounds] = useState(0)

  function pickedNumberHandler(pickedNumber) {
    /*
      pickedNumber => user entered value, by default it is string
      updates the userNumber to the current user entered value
    */
    setUserNumber(pickedNumber)
  }

  function gameOverHandler() {
    /*
      If phone guessed number and user entered number both are then this function updates gameIsOver to true.
      This function is called by GameScreen component(child component of the app)
    */
    setGameIsOver(true)
  }

  function gameStartHandler() {
    /*
      This function is called if user  clicks on start game from game over screen.
      This function sets all values to initial values.
    */
    setGameIsOver(false)
    setUserNumber("")
    setRounds(0)
  }

  function updateRounds(numRounds) {
    /*
      numRounds => no.of guess, integer
      This is used to update the no.of rounds variable.
      Its is called from game screen if the game is over before moving 
      the game over screen we update the rounds variable then we pass it game over screen
    */
    setRounds(numRounds)
  }

  /* 
    Screen variable is used for screen navigation.
    Initial screen var holds start game screen.
  */
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if (userNumber) {
    /*
      If user enter valid number then screen updates to Game Screen.
      First screen var is having start game screen only but we are assign
      it below that assignment so screen var will be updated with new screen.
    */
    screen = (
      <GameScreen
        userNumber={userNumber}
        onGameOver={gameOverHandler}
        updateRounds={updateRounds}
      />
    )
  }

  if (gameIsOver) {
    /*
      In phone guess the number correctly then screen variable is updated with game over screen.
    */
    screen = (
      <GameOverScreen
        onGameStart={gameStartHandler}
        userNumber={userNumber}
        roundNumber={rounds}
      />
    )
  }

  return (
    /*
      - StatusBar is expo component. By using this we can style the status bar of the device.
      - LinearGradient is expo component which helps color gradients.
      - ImageBackground is react native component which is used to add back ground image.
        In native we use require function to give image path.
      - SafeAreaView is react native component which is used to give some space at the top according to phone.
        If phone as camera into the screen then it will give space accordingly.
    */
    <>
    <StatusBar style='light'/>
      <LinearGradient colors={["#4e0329", "#ddb52f"]} style={{ flex: 1 }}>
        <ImageBackground
          source={require("./assets/images/dice.jpeg")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backGroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
      </>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    padding: 24,
  },

  backGroundImage: {
    opacity: 0.15,
  },
})

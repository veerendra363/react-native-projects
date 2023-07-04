
// we only work with functional components and hooks not the class.

/* 
  Html tags doesn't work here like <div> <span> ..
  React native provides components which will later converted into native UI\
  By using core components of react native we can build apps.
*/
import { Button, StyleSheet, Text, View } from 'react-native';
import FlexBox from './components/flexbox';
import Goal from './components/goal';

/*
  App component/ root component
  Expo render this component automatically
  All our UI elements go into app component or its child components or its descendants.
*/
export default function App() {

  // Just un comment the component and check the functionality.
  // Go to that component to know more that component if u want.
  return (

    <>
    {/* I started learning with the below component*/}
    {/* <FirstCode></FirstCode> */}

    {/* it used to learn the basics flex box style  */}
    {/* <FlexBox></FlexBox> */}

    {/* basic todo app */}
    <Goal></Goal>
    </>

  );
}

/*
  There is no css
  We can style using Stylesheet objects or Inline styles
  We us js objects for styling there is no other lang for it.
  Maximum we will get all css styling with js objects but some names are diff.

  below code is style sheet object.
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textStyling: {
    margin: 16, 
    borderWidth: 2, 
    borderColor: 'red', 
    padding: 16
  }
});


/*
  Started with below code in the app function but i am using same code
  for learning diff concepts. so moved that here
*/
function FirstCode() {
  return (
/* 
      view component holds the text, buttons, .. 
      but not directly we have to keep them in a their respective components 
      it is a container
    */
    <View style={styles.container}>

      {/* 
        text component displays the text
        in below code we are using style sheet object for styling
      */}
      <Text style={styles.textStyling}>Hey Siri</Text> 

      {/* 
        Inline styling
        Don't use inline styles. create style sheet object
      */}
      <Text style={
        {margin: 16, borderWidth: 2, borderColor: 'red', padding: 16 }
      }>Hello styling</Text>

      {/* button is a self closing component */}
      <Button title='click me'/>
    </View>
  )

}

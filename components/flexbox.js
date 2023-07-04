/*
  The below code has three view boxes 
  and we will play the flex styling.
*/
import { StyleSheet, Text, View } from "react-native";

export default function FlexBox () {
  return (
    /* Every view in the native have flex box styling by default */
    <View style={{padding: 50, ...styles.flexStyles }}>
      <View style={{...styles.container, backgroundColor:'red' }}>
        <Text>1</Text>
      </View>
      <View style={{...styles.container, backgroundColor:'blue', flex:2}}>
        <Text>2</Text>
      </View>
      <View style={{...styles.container, backgroundColor:'green', flex:3}}>
        <Text>3</Text>
      </View>
    </View>
    /*
       in the above code flex is used
       flex takes the remaining space after giving to the non 
       flex components then it will divide that space into
       n part(where n is sum of all number given for flex) gives to each components
       how many parts are mention for that.
     */
  )
}

const styles = StyleSheet.create({
  flexStyles: {
    // it used give direction to element
    flexDirection: 'row',

    // it used to align the elements in main axis
    justifyContent: 'space-around',

    //it is used to align the element in cross axis 
    alignItems: 'center',

    /*
      direction: row, 
        main axis:  l to r, cross axis: t to b
      direction: row-reverse, 
        main axis:  r to l, cross axis: b to t
      direction: column,
        main axis:  t to b, cross axis: r to l
      direction: column-reverse,
        main axis:  b to t, cross axis: l to r
     */
    height: 300,
    width: '80%'
  },
  container:{
    justifyContent:'center',
    alignItems: 'center'
  }
})
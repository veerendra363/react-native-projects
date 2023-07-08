import { Platform, Pressable, StyleSheet, Text, View } from "react-native"

function CategoryGrideTile({title, color, onPress}) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        android_ripple={{ color: "#ccc" }}
        onPress={onPress}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default CategoryGrideTile

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: '0.25',
    shadowOffset: { width: 0, height: 2},
    backgroundColor: 'white',
    shadowRadius: 8,

    // if overflow is hidden for the ios then we can able to see the shadow because they are overflowing
    overflow:  Platform.OS === 'android' ? 'hidden' : 'visible'

  },

  buttonPressed: {
    opacity: 0.5

  },

  button: {
    flex: 1
  },

  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
   
  title: {
    fontWeight: 'bold',
    fontSize: 18
   }
})

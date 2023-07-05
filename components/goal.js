

import { useState } from "react";
import { Button, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"

export default function Goal() {
    const [enteredGoalText, setEnteredGoalText] = useState('');
    const [courseGoals, setCourseGoals] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false)

    function goalInputHandler(enteredText) {
        // for each key stoke we update the state variable with new value
        setEnteredGoalText(enteredText)
    }

    function onAddNewModalClick() {
        setIsModalVisible(true)
    }

    function onModalCancelClick() {
        setIsModalVisible(false)
    }

    function addGoalHandler() {
        /* 
        Key is used by flatList component to identify each item in the list
        uniquely identified.
        random() may key duplicate values. add some better unique key here if its real time app.
        if u have some unique identifiers in the list then use them as key. but FlatList
        only search for key attribute. if ur unique identifier has different name then use
        keyExtractor prop for FlatList to extract key
        */

        setCourseGoals( currGoals => [...currGoals, {text: enteredGoalText, key: Math.random().toString()}])

        /*
            After adding the goal to the list we are going to remove it from input box.
            set enteredGoalText to empty and bind it with TextInput component using value prop.
        */
        setEnteredGoalText('')
        onModalCancelClick()
    }

    function deleteGoalHandler(key) {
        // if user clicks on any key we will get the key then we have to remove that key value form the list of goals
        setCourseGoals(currGoals => currGoals.filter(goal => goal.key !== key))

        // Issue, New: (focus issue)know if focus is out of the list of the goals then i first have to change the focus next i
        // am able to delete it. we can solve it with diff ways but as now i am keeping it as it is. 


    }

    return (
        <View style={styles.goalsContainer}>
            <Button title="Add New Goal" onPress={onAddNewModalClick}/>
            <Modal visible={isModalVisible} animationType="fade">
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={require('../assets/Goal/goal.png')}/>
                <TextInput 
                    style={styles.textInput} 
                    placeholder="Enter your goal"
                    onChangeText={goalInputHandler}
                    value={enteredGoalText}/>
                <View style={styles.buttonsGroup}>
                    <View style={styles.button}><Button title='Add' onPress={addGoalHandler}/></View>
                    <View style={styles.button}><Button title="cancel" onPress={onModalCancelClick} /></View>
                </View>
            </View>
            </Modal>

            {/*
                As we have many goals so we need scrolling
                ScrollView is better for small data where its renders all data at a time
                FlatView is better for large data. its renders lazily

                to solve the styling issues we wrap scrolling in view
             */}
            <View style={styles.listContainer}>
            {/* <ScrollView >
                <Text>List of Goals..</Text>
                {courseGoals.map( goal => 
                // The border radius style directly to text will not work in ios but 
                // it will in android. to fix that issue we wrap text in view and then apply
                // border radius to view component then it will apply styling in both ios and
                // android.

                // like css here styles not be inherited so add styles for text separately 
                <View key={goal} style={styles.goalViewItem}>
                    <Text style={styles.goalItem}>{goal}</Text>
                </View>
                 )}
            </ScrollView> */}

            <FlatList data={courseGoals} renderItem={itemData => 
            /*
                Directly we cannot press the text.
                So to making pressable we have to wrap it in the pressable component.
                We will make it press with diff ways also but now i am going with pressable.

                android_ripple adds styling to pressed item for only android 
                we have style prop for styling both ios and android on press.
                style prop takes object and function. the function which is passed to
                style will automatically called by pressable component it will pass one argument to
                the function which is an object but we directly destructure it and get the pressed attribute
                value if the pressed is true we will apply the styling
            */
            
                <View style={styles.goalViewItem}>
                    <Pressable
                        // android_ripple={{ color: 'gray'}}
                        style={({pressed}) => pressed && styles.pressedStyles}
                        onPress={deleteGoalHandler.bind(this, itemData.item.key)}>
                    <Text style={styles.goalItem}>{itemData.item.text}</Text>
                    </Pressable>
                </View>
            }>

            </FlatList>

            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    goalsContainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
    },

    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 8

    },

    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        width: '70%',
        padding: 8,
        marginBottom: 16
    },

    listContainer: {
        flex: 5
    },

    goalViewItem: {
        margin: 8,
        borderRadius: 6,
        backgroundColor: 'orange'
    },

    goalItem: {
       color: 'white',
       padding: 8,
    },

    pressedStyles: {
        opacity: 0.5
    },

    buttonsGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button: {
        marginHorizontal: 16
    },
    image: {
        width:100,
        height: 100,
        margin: 8
    }


})
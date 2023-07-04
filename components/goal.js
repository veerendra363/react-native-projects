

import { useState } from "react";
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"

export default function Goal() {
    const [enteredGoalText, setEnteredGoalText] = useState('');
    const [courseGoals, setCourseGoals] = useState([]);

    function goalInputHandler(enteredText) {
        setEnteredGoalText(enteredText, )
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
    }

    return (
        <View style={styles.goalsContainer}>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.textInput} 
                    placeholder="Enter your goal"
                    onChangeText={goalInputHandler}/>
                <Button title='Add' onPress={addGoalHandler}/>
            </View>

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
                <View style={styles.goalViewItem}>
                    <Text style={styles.goalItem}>{itemData.item.text}</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 8

    },

    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        width: '70%',
        padding: 8,
        marginRight: 8
    },

    listContainer: {
        flex: 5
    },

    goalViewItem: {
        margin: 8,
        padding: 8,
        borderRadius: 6,
        backgroundColor: 'orange'
    },

    goalItem: {
       color: 'white' 
    }


})
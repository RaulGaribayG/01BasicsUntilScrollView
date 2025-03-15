import { useState } from 'react';
//To use other core components we need to import them, in React.Js this isn't necessary but in Native it is.
import { 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  TextInput, 
  ScrollView
} from 'react-native';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState(''); //String value. Just one value each time, rewriting the existing value.
  const [courseGoals, setCourseGoals] = useState([]); //Array of string values. Add new values each time, saving the currents.

  //Used to set the value for a new goal, called inside the text box.
  function goalInputHandler(enteredText) {
    //This put the value from "enteredText" into "enteredGoalText".
    setEnteredGoalText(enteredText);
  }

  //Used to add the value entered by the user into the array that contains all the goals.
  function addGoalHandler() {
    /*
      Updates the array of goals generating a new array using the spread operator to put the current values of "courseGoals" alongside
      the value in "enteredGoalText" (previously setted with the function "goalInputHandler")
      Note: The best way of update an array is with the spread operator, when our value depends of the previous state.
    */
    setCourseGoals(currentCourseGoals => [...currentCourseGoals, enteredGoalText]);
  }

  return (
    /*
      Views are used to build boxes and containers that hold other core components, are like the equivalents
      to divs in web development, but to show something inside of a View it needs to be into an element
      that is able to display it.

      style prop is used to put some style but is not supported by all the components.
      View and Text are components which support style prop. 

      Also we can write our styles in line but that means it wouldn't be reusable, so it isn't recommendable.
      So it's better to use a StyleSheet object, so we can make our styles reusable.
    */
    <View style={styles.appContainer}>
      {/* To put comments inside core components, they need to be inside of {} */}
      <View style={styles.inputContainer}>
        {/* 
          Put an evente to catch the user-entered text, this will be a pointer to the function because we don't
          to execute this function until text is settled inside the box.
        */}
        <TextInput
          style={styles.textInput}
          placeholder='Your course goal!'
          onChangeText={goalInputHandler} />
        {/* 
          Add the new goal inside the text box when the button is pressed with the function "addGoalHandler".
        */}
        <Button title="Add goal" onPress={addGoalHandler} />
      </View>
      <View style={styles.goalsContainer}>
        {/* 
          ScrollView to show a scroll bar and for limited amounts of content, but for dynamic lists (which could
          become super long) we use FlatList to only loading data when it´s needed.
        */}
        <ScrollView>
          {/* 
            Every time the button is pressed, the list updates to show the new goal, this is donde thanks to "useState",
            it evaluates the changes and updates just the necessary parts without re-rendering the entire component.

            We can use map to do this but just when we aren't using FlatList, because the task would be now passed to FlatList
            so it can render the list efficiently by only rendering what's neeeded.

            Also, it's necessary put the style inside a view because otherwise part of the style will be missing on iOS devices,
            not every time this would happen, but sometimes its necessary make little adjustments to our code to look the same
            in both Android and iOS.
          */}
          {courseGoals.map((goal) => 
            <View style={styles.goalItem} key={goal}>
              {/* 
                We need to create a new style for the text because, unlike traditional CSS, in React Native the styles aren't inherited
                from their parent.
              */}
              <Text style={styles.goalText}> {goal} </Text>
            </View>
          )};
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8
  },
  goalsContainer: {
    flex: 5
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    //backgroundColor: '#5e0acc', //Purple color
    backgroundColor: '#000000'
  },
  goalText: {
    color: 'white'
  }
});

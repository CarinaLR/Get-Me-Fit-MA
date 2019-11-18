import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TextInput, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default function LinksScreen() {
  const [enteredGoal, setEnteredGoal] = useState('');

  const goalInputHandler = enteredText => {
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    props.onAddGoal(enteredGoal);
    setEnteredGoal('');
  };

  const resetGoal = () => {
    props.onResetGoal(props.id);
  };
  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Your Goal In Pounds"
          keyboardType="numeric"
          style={styles.inputGoal}
          onChangeText={goalInputHandler}
          // onChangeText={numberInputHandler}
          value={enteredGoal}
        />
        <Button title="ADD" onPress={addGoalHandler} />
        <Button title="Reset" color="red" onPress={resetGoal} />
      </View>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Please enter your information below',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputGoal: {
    width: '60%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});

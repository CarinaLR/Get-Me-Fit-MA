import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Button,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';

export default function App(props) {
  const [weightLossGoals, setWeightLossGoals] = useState([]);

  const addGoalHandler = goalTitle => {
    setWeightLossGoals(currentGoals => [
      ...currentGoals,
      { key: Math.random().toString(), value: goalTitle },
    ]);
  };

  const removeGoalHandler = goalId => {
    setWeightLossGoals(currentGoals => {
      return currentGoals.filter(goal => goal.id !== goalId);
    });
  };
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
        {/* <View style={styles.yourGoal}>
          <LinksScreen
            onAddGoal={addGoalHandler}
            onResetGoal={removeGoalHandler}
          />
          <FlatList
            keyExtractor={(item, index) => item.key}
            data={weightLossGoals}
            renderItem={itemData => (
              <GoalInput
                id={itemData.item.id}
                onDelete={removeGoalHandler}
                title={itemData.item.value}
              />
            )}
          />
        </View> */}
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  yourGoal: {
    flex: 1,
    padding: 40,
    backgroundColor: 'grey',
  },
});

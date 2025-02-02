import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';
import ExercisesGridComponent from './ExercisesGrid';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Exercises" titleStyle={styles.title} />
        <IconButton
          icon="plus"
          size={24}
          iconColor="white"
          style={styles.iconButton}
          onPress={() => console.log('Add button pressed')}
        />
      </Appbar.Header>
      <ExercisesGridComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar: {
    backgroundColor: 'red', // Change this to your desired color
  },
  title: {
    color: 'white',
  },
  iconButton: {
    backgroundColor: 'black',
    borderRadius: 24,
  },
});

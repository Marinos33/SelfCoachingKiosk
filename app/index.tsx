import { View, Text, StyleSheet } from 'react-native';
import ExercisesGridComponent from './ExercisesGrid';

export default function HomeScreen() {
  return <ExercisesGridComponent />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

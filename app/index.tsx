import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ExercisesGridComponent from './ExercisesGrid';
import HeaderBar from './HeaderBar';
import ExerciseModalFormModalForm from './ExerciseModalForm';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <HeaderBar onPlusPress={() => setModalVisible(true)} />
      <ExercisesGridComponent />
      <ExerciseModalFormModalForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

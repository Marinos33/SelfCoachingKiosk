import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ExercisesGridComponent from './ExercisesGrid';
import HeaderBar from './HeaderBar';
import AddExerciseModalForm from './AddExerciseModalForm';
import ExerciseItem from '@/model/ExerciseItem';
import UpdateExerciseModalForm from './UpdateExerciseModalForm/index.tsx';

const initialItems: ExerciseItem[] = [
  {
    Id: 1,
    Image: 'https://picsum.photos/600/600',
    MachineName: 'Machine name',
    Weight: '25kg',
    Description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa Description',
    Status: false,
    NumberOfSeries: '',
    RepsPerSeries: '',
    RestBetweenSeries: null,
    Tempo: null,
    Notes: null,
  },
  {
    Id: 2,
    Image: 'https://picsum.photos/600/600',
    MachineName: 'Machine name',
    Weight: '25kg',
    Description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa Description',
    Status: false,
    NumberOfSeries: '',
    RepsPerSeries: '',
    RestBetweenSeries: null,
    Tempo: null,
    Notes: null,
  },
  {
    Id: 3,
    Image: 'https://picsum.photos/600/600',
    MachineName: 'Machine name',
    Weight: '25kg',
    Description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa Description',
    Status: false,
    NumberOfSeries: '',
    RepsPerSeries: '',
    RestBetweenSeries: null,
    Tempo: null,
    Notes: null,
  },
  {
    Id: 4,
    Image: 'https://picsum.photos/600/600',
    MachineName: 'Machine name',
    Weight: '25kg',
    Description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa Description',
    Status: false,
    NumberOfSeries: '',
    RepsPerSeries: '',
    RestBetweenSeries: null,
    Tempo: null,
    Notes: null,
  },
];

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [items, setItems] = useState<ExerciseItem[]>(initialItems);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseItem | null>(
    null,
  );

  const handleSave = (item: ExerciseItem) => {
    setItems((prevItems) => [
      ...prevItems,
      { ...item, Id: prevItems.length + 1 },
    ]);
    setModalVisible(false);
  };

  const handleUpdate = (updatedItem: ExerciseItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.Id === updatedItem.Id ? updatedItem : item,
      ),
    );
    setUpdateModalVisible(false);
  };

  const handleCheckboxPress = (key: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.Id === key ? { ...item, Status: !item.Status } : item,
      ),
    );
  };

  const handleEditPress = (exercise: ExerciseItem) => {
    setSelectedExercise(exercise);
    setUpdateModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <HeaderBar onPlusPress={() => setModalVisible(true)} />
      <ExercisesGridComponent
        items={items}
        onCheckboxPress={handleCheckboxPress}
        onEditPress={handleEditPress}
      />
      <AddExerciseModalForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
      {selectedExercise && (
        <UpdateExerciseModalForm
          visible={updateModalVisible}
          onClose={() => setUpdateModalVisible(false)}
          onUpdate={handleUpdate}
          exercise={selectedExercise}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

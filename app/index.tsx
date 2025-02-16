import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ExercisesGridComponent from './ExercisesGrid';
import HeaderBar from './HeaderBar';
import AddExerciseModalForm from './AddExerciseModalForm';
import UpdateExerciseModalForm from './UpdateExerciseModalForm/index.tsx';
import ExerciseItem from '@/model/ExerciseItem';
import { useExerciseRepository } from '../hooks/repository/useExerciseRepository';
import { Buffer as BufferPkg } from 'buffer';
import {
  mapDbToExerciseItem,
  mapExerciseItemToDb,
} from '../model/ExerciseMapper';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseItem | null>(
    null,
  );
  const [items, setItems] = useState<ExerciseItem[]>([]);
  const {
    data,
    addExercise,
    updateExercise,
    removeExercise,
    getById,
    success,
  } = useExerciseRepository();

  useEffect(() => {
    if (!success) return;

    if (data) {
      const exercises = data.map((item: any) => mapDbToExerciseItem(item));

      setItems(exercises);
    }
  }, [data, success]);

  const handleAdd = (item: ExerciseItem) => {
    addExercise({
      image: item.Image ? BufferPkg.from(item.Image, 'base64') : null,
      machineName: item.MachineName,
      description: item.Description,
      weight: item.Weight,
      numberOfSeries: item.NumberOfSeries,
      repsPerSeries: item.RepsPerSeries,
      restBetweenSeries: item.RestBetweenSeries,
      tempo: item.Tempo,
      notes: item.Notes,
    });

    setModalVisible(false);
  };

  const handleUpdate = (updatedItem: ExerciseItem) => {
    updateExercise({
      id: updatedItem.Id,
      image: updatedItem.Image
        ? BufferPkg.from(updatedItem.Image, 'base64')
        : null,
      machineName: updatedItem.MachineName,
      description: updatedItem.Description,
      weight: updatedItem.Weight,
      numberOfSeries: updatedItem.NumberOfSeries,
      repsPerSeries: updatedItem.RepsPerSeries,
      restBetweenSeries: updatedItem.RestBetweenSeries,
      tempo: updatedItem.Tempo,
      notes: updatedItem.Notes,
    });

    setUpdateModalVisible(false);
  };

  const handleRemove = (key: number) => {
    removeExercise(key);
    setUpdateModalVisible(false);
  };

  const handleCheckboxPress = (key: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.Id === key ? { ...item, Status: !item.Status } : item,
      ),
    );
  };

  const handleEditPress = async (exercise: ExerciseItem) => {
    const selectedExercise: ExerciseItem = mapDbToExerciseItem(
      await getById(exercise.Id),
    );

    setSelectedExercise(selectedExercise);
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
        onSave={handleAdd}
      />
      {selectedExercise && (
        <UpdateExerciseModalForm
          visible={updateModalVisible}
          onClose={() => setUpdateModalVisible(false)}
          onUpdate={handleUpdate}
          onRemove={handleRemove}
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

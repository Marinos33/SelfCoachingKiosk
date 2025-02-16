import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ExercisesGridComponent from './ExercisesGrid';
import HeaderBar from './HeaderBar';
import AddExerciseModalForm from './AddExerciseModalForm';
import ExerciseItem from '@/model/ExerciseItem';
import UpdateExerciseModalForm from './UpdateExerciseModalForm/index.tsx';
import * as SQLite from 'expo-sqlite';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import migrations from '../drizzle/migrations';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import * as schema from '../persistence/schema';
import { eq } from 'drizzle-orm';
import { Buffer as BufferPkg } from 'buffer';

const expo = SQLite.openDatabaseSync('selfcochingkiosk.db', {
  enableChangeListener: true,
});

const db = drizzle(expo);

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseItem | null>(
    null,
  );
  const { success, error } = useMigrations(db, migrations);
  const [items, setItems] = useState<ExerciseItem[]>([]);
  const { data } = useLiveQuery(db.select().from(schema.exercicesTable));

  useEffect(() => {
    if (!success) return;

    if (data) {
      const exercises = data.map((item: any) => {
        return {
          Id: item.id,
          Image: item.image
            ? BufferPkg.from(item.image).toString('base64')
            : null,
          MachineName: item.machineName,
          Description: item.description,
          Weight: item.weight,
          NumberOfSeries: item.numberOfSeries,
          RepsPerSeries: item.repsPerSeries,
          RestBetweenSeries: item.restBetweenSeries,
          Tempo: item.tempo,
          Notes: item.notes,
          Status: false,
        };
      });

      setItems(exercises);
    }
  }, [data, success]);

  const handleAdd = (item: ExerciseItem) => {
    db.insert(schema.exercicesTable)
      .values({
        image: item.Image ? BufferPkg.from(item.Image, 'base64') : null,
        machineName: item.MachineName,
        description: item.Description,
        weight: item.Weight,
        numberOfSeries: item.NumberOfSeries,
        repsPerSeries: item.RepsPerSeries,
        restBetweenSeries: item.RestBetweenSeries,
        tempo: item.Tempo,
        notes: item.Notes,
      })
      .execute();

    setModalVisible(false);
  };

  const handleUpdate = (updatedItem: ExerciseItem) => {
    db.update(schema.exercicesTable)
      .set({
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
      })
      .where(eq(schema.exercicesTable.id, updatedItem.Id))
      .execute();

    setUpdateModalVisible(false);
  };

  const handleRemove = (key: number) => {
    db.delete(schema.exercicesTable)
      .where(eq(schema.exercicesTable.id, key))
      .execute();

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

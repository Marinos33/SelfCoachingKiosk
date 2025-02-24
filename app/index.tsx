import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  ActivityIndicator,
} from 'react-native';
import ExercisesGridComponent from './ExercisesGrid';
import HeaderBar from './HeaderBar';
import AddExerciseModalForm from './AddExerciseModalForm';
import ExerciseItem from '@/model/ExerciseItem';
import { useExerciseRepository } from '../hooks/repository/useExerciseRepository';
import {
  mapDbToExerciseItem,
  mapExerciseItemToDbForAdd,
  mapExerciseItemToDbForUpdate,
} from '../model/ExerciseMapper';
import UpdateExerciseModalForm from './UpdateExerciseModalForm';
import { useTheme } from 'react-native-paper';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseItem | null>(
    null,
  );
  const [items, setItems] = useState<ExerciseItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    data,
    addExercise,
    updateExercise,
    removeExercise,
    getById,
    fetchData,
    success,
  } = useExerciseRepository();
  const theme = useTheme();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };

    loadData();
  }, [fetchData]);

  useEffect(() => {
    if (!success) return;

    if (data) {
      const exercises = data.map((item: any) => mapDbToExerciseItem(item));

      setItems(exercises);
    }
  }, [data, success]);

  const handleAdd = async (item: ExerciseItem) => {
    setLoading(true);
    addExercise(mapExerciseItemToDbForAdd(item));
    setLoading(false);

    setModalVisible(false);
  };

  const handleUpdate = async (updatedItem: ExerciseItem) => {
    setLoading(true);
    updateExercise(mapExerciseItemToDbForUpdate(updatedItem));
    setLoading(false);

    setSelectedExercise(null);
    setUpdateModalVisible(false);
  };

  const handleRemove = async (key: number) => {
    setLoading(true);
    removeExercise(key);
    setLoading(false);

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
    setLoading(true);
    const selectedExercise: ExerciseItem = mapDbToExerciseItem(
      await getById(exercise.Id),
    );
    setLoading(false);

    setSelectedExercise(selectedExercise);
    setUpdateModalVisible(true);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {(loading || !success) && (
        <ActivityIndicator
          size={120}
          color={theme.colors.primary}
          style={styles.loading}
        />
      )}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

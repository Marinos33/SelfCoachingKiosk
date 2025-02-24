import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  IconButton,
  Modal,
  TextInput,
  Text,
  useTheme,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import ExerciseItem from '@/model/ExerciseItem';
import * as FileSystem from 'expo-file-system';

interface UpdateExerciseModalFormProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (item: ExerciseItem) => void;
  onRemove: (key: number) => void;
  exercise: ExerciseItem;
}

const UpdateExerciseModalForm: React.FC<UpdateExerciseModalFormProps> = ({
  visible,
  onClose,
  onUpdate,
  onRemove,
  exercise,
}) => {
  const [image, setImage] = useState<string | null>(exercise.Image);
  const [machineName, setMachineName] = useState(exercise.MachineName);
  const [description, setDescription] = useState(exercise.Description || '');
  const [weight, setWeight] = useState(exercise.Weight);
  const [numberOfSeries, setNumberOfSeries] = useState(exercise.NumberOfSeries);
  const [repsPerSeries, setRepsPerSeries] = useState(exercise.RepsPerSeries);
  const [restBetweenSeries, setRestBetweenSeries] = useState<string | null>(
    exercise.RestBetweenSeries || null,
  );
  const [tempo, setTempo] = useState<string | null>(exercise.Tempo || null);
  const [notes, setNotes] = useState<string | null>(exercise.Notes || null);
  const theme = useTheme();

  useEffect(() => {
    setImage(exercise.Image);
    setMachineName(exercise.MachineName);
    setDescription(exercise.Description || '');
    setWeight(exercise.Weight);
    setNumberOfSeries(exercise.NumberOfSeries);
    setRepsPerSeries(exercise.RepsPerSeries);
    setRestBetweenSeries(exercise.RestBetweenSeries || null);
    setTempo(exercise.Tempo || null);
    setNotes(exercise.Notes || null);
  }, [exercise]);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImage(base64);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleUpdate = () => {
    if (!machineName || !weight || !numberOfSeries || !repsPerSeries) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const updatedItem: ExerciseItem = {
      ...exercise,
      Image: image,
      MachineName: machineName,
      Description: description,
      Weight: weight,
      NumberOfSeries: numberOfSeries,
      RepsPerSeries: repsPerSeries,
      RestBetweenSeries: restBetweenSeries || null,
      Tempo: tempo,
      Notes: notes,
    };

    onUpdate(updatedItem);

    handleClose();
  };

  const handleRemove = () => {
    Alert.alert(
      'Confirm Removal',
      'Are you sure you want to remove this exercise?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            onRemove(exercise.Id);
            handleClose();
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <Modal
      visible={visible}
      onDismiss={handleClose}
      dismissable={false}
      contentContainerStyle={{
        ...styles.modalView,
        backgroundColor: theme.colors.surfaceVariant,
      }}
    >
      <View style={styles.header}>
        <View style={styles.leftButtons}>
          <IconButton
            icon="delete"
            size={24}
            onPress={handleRemove}
            style={{
              ...styles.removeIcon,
              backgroundColor: theme.colors.error,
            }}
          />
          <IconButton
            icon="close"
            size={24}
            onPress={handleClose}
            style={{
              ...styles.closeIcon,
              backgroundColor: theme.colors.outline,
            }}
          />
        </View>
        <IconButton
          icon="check"
          size={24}
          iconColor={theme.colors.inverseOnSurface}
          onPress={handleUpdate}
          style={styles.saveIcon}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.modalText}>Update Exercise</Text>
        <TouchableOpacity
          style={{
            ...styles.photoButton,
            backgroundColor: theme.colors.onSurfaceVariant,
          }}
          onPress={pickImage}
        >
          {image ? (
            <Image
              source={{ uri: `data:image/jpeg;base64,${image}` }}
              style={styles.image}
            />
          ) : (
            <>
              <IconButton
                icon="camera"
                size={24}
                iconColor={theme.colors.inverseSurface}
              />
              <Text style={styles.photoButtonText}>Upload or Take a Photo</Text>
            </>
          )}
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Machine Name{' '}
            <Text
              style={{
                color: theme.colors.primary,
              }}
            >
              *
            </Text>
          </Text>
          <TextInput
            style={{
              ...styles.input,
              backgroundColor: theme.colors.onSurfaceVariant,
            }}
            mode="outlined"
            value={machineName}
            onChangeText={setMachineName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            style={{
              ...styles.input,
              ...styles.textArea,
              backgroundColor: theme.colors.onSurfaceVariant,
            }}
            multiline
            numberOfLines={4}
            mode="outlined"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Weight <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={{
              ...styles.input,
              backgroundColor: theme.colors.onSurfaceVariant,
            }}
            keyboardType="numeric"
            mode="outlined"
            value={weight}
            onChangeText={setWeight}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Number of Series <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={{
              ...styles.input,
              backgroundColor: theme.colors.onSurfaceVariant,
            }}
            mode="outlined"
            value={numberOfSeries}
            onChangeText={setNumberOfSeries}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Reps per Series <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={{
              ...styles.input,
              backgroundColor: theme.colors.onSurfaceVariant,
            }}
            mode="outlined"
            value={repsPerSeries}
            onChangeText={setRepsPerSeries}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Rest Between Series</Text>
          <TextInput
            style={{
              ...styles.input,
              backgroundColor: theme.colors.onSurfaceVariant,
            }}
            mode="outlined"
            value={restBetweenSeries || undefined}
            onChangeText={setRestBetweenSeries}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Tempo</Text>
          <TextInput
            style={{
              ...styles.input,
              backgroundColor: theme.colors.onSurfaceVariant,
            }}
            mode="outlined"
            value={tempo || undefined}
            onChangeText={setTempo}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Notes</Text>
          <TextInput
            style={{
              ...styles.input,
              ...styles.textArea,
              backgroundColor: theme.colors.onSurfaceVariant,
            }}
            multiline
            numberOfLines={4}
            mode="outlined"
            value={notes || undefined}
            onChangeText={setNotes}
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    height: '90%',
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftButtons: {
    flexDirection: 'row',
  },
  closeIcon: {
    borderRadius: 12,
  },
  removeIcon: {
    borderRadius: 12,
  },
  saveIcon: {
    backgroundColor: '#4caf50',
    borderRadius: 12,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  photoButtonText: {
    marginLeft: 10,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 5,
  },
  inputLabel: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  required: {
    color: 'red',
  },
  input: {
    width: '100%',
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default UpdateExerciseModalForm;

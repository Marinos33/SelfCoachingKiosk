import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { IconButton, Modal, Portal, TextInput, Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import ExerciseItem from '@/model/ExerciseItem';

interface AddExerciseModalFormProps {
  visible: boolean;
  onClose: () => void;
  onSave: (item: ExerciseItem) => void;
}

const AddExerciseModalForm: React.FC<AddExerciseModalFormProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [machineName, setMachineName] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [numberOfSeries, setNumberOfSeries] = useState('');
  const [repsPerSeries, setRepsPerSeries] = useState('');
  const [restBetweenSeries, setRestBetweenSeries] = useState('');
  const [tempo, setTempo] = useState('');
  const [notes, setNotes] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const resetForm = () => {
    setImage(null);
    setMachineName('');
    setDescription('');
    setWeight('');
    setNumberOfSeries('');
    setRepsPerSeries('');
    setRestBetweenSeries('');
    setTempo('');
    setNotes('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSave = () => {
    if (!machineName || !weight || !numberOfSeries || !repsPerSeries) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const item: ExerciseItem = {
      Id: 0,
      Image: image,
      MachineName: machineName,
      Description: description,
      Weight: weight,
      NumberOfSeries: numberOfSeries,
      RepsPerSeries: repsPerSeries,
      RestBetweenSeries: restBetweenSeries,
      Tempo: tempo,
      Notes: notes,
      Status: false,
    };
    onSave(item);
    handleClose();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleClose}
        dismissable={false}
        contentContainerStyle={styles.modalView}
      >
        <View style={styles.header}>
          <IconButton
            icon="close"
            size={24}
            iconColor="white"
            onPress={handleClose}
            style={styles.closeIcon}
          />
          <IconButton
            icon="check"
            size={24}
            iconColor="white"
            onPress={handleSave}
            style={styles.saveIcon}
          />
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.modalText}>Add Exercise</Text>
          <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <>
                <IconButton icon="camera" size={24} iconColor="white" />
                <Text style={styles.photoButtonText}>
                  Upload or Take a Photo
                </Text>
              </>
            )}
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              Machine Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              mode="outlined"
              value={machineName}
              onChangeText={setMachineName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
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
              style={styles.input}
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
              style={styles.input}
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
              style={styles.input}
              mode="outlined"
              value={repsPerSeries}
              onChangeText={setRepsPerSeries}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Rest Between Series</Text>
            <TextInput
              style={styles.input}
              mode="outlined"
              value={restBetweenSeries}
              onChangeText={setRestBetweenSeries}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Tempo</Text>
            <TextInput
              style={styles.input}
              mode="outlined"
              value={tempo}
              onChangeText={setTempo}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
              mode="outlined"
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </ScrollView>
      </Modal>
    </Portal>
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
  },
  closeIcon: {
    backgroundColor: '#a7a7a7',
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
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a7a7a7',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  photoButtonText: {
    color: 'white',
    marginLeft: 10,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 5,
  },
  inputLabel: {
    marginBottom: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  required: {
    color: 'red',
  },
  input: {
    width: '100%',
    backgroundColor: '#f0f0f0',
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

export default AddExerciseModalForm;

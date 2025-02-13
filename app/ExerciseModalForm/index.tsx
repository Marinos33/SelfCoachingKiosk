import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { IconButton, Modal, Portal, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

interface ExerciseModalFormProps {
  visible: boolean;
  onClose: () => void;
}

const ExerciseModalForm: React.FC<ExerciseModalFormProps> = ({
  visible,
  onClose,
}) => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    /*let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });*/

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

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        dismissable={false}
        contentContainerStyle={styles.modalView}
      >
        <View style={styles.header}>
          <IconButton
            icon="close"
            size={24}
            iconColor="white"
            onPress={onClose}
            style={styles.closeIcon}
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
            <Text style={styles.inputLabel}>Machine Name</Text>
            <TextInput style={styles.input} mode="outlined" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
              mode="outlined"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Weight</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              mode="outlined"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Number of Series</Text>
            <TextInput style={styles.input} mode="outlined" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Reps per Series</Text>
            <TextInput style={styles.input} mode="outlined" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Rest Between Series</Text>
            <TextInput style={styles.input} mode="outlined" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Tempo</Text>
            <TextInput style={styles.input} mode="outlined" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
              mode="outlined"
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
    justifyContent: 'flex-end',
  },
  closeIcon: {
    backgroundColor: '#6200ee',
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
    backgroundColor: '#6200ee',
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

export default ExerciseModalForm;

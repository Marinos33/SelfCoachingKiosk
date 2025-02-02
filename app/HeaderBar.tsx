import React from 'react';
import { Appbar, IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface HeaderBarProps {
  onPlusPress: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ onPlusPress }) => {
  return (
    <Appbar.Header style={styles.appbar}>
      <Appbar.Content title="Exercises" titleStyle={styles.title} />
      <IconButton
        icon="plus"
        size={24}
        iconColor="white"
        style={styles.iconButton}
        onPress={onPlusPress}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
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

export default HeaderBar;

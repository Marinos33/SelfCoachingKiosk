import React from 'react';
import { Appbar, IconButton, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface HeaderBarProps {
  onPlusPress: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ onPlusPress }) => {
  const theme = useTheme();
  return (
    <Appbar.Header>
      <Appbar.Content title="Self Coaching Kiosk" />
      <IconButton
        icon="plus"
        size={24}
        iconColor="white"
        style={{
          ...styles.iconButton,
          backgroundColor: theme.colors.background,
        }}
        onPress={onPlusPress}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    borderRadius: 24,
  },
});

export default HeaderBar;

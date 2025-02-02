import { PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </PaperProvider>
  );
}

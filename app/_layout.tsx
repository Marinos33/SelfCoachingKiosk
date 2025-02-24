import { Stack } from 'expo-router';
import {
  MD3DarkTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Colors } from '../constants/Colors';
import merge from 'deepmerge';
import * as Sentry from '@sentry/react-native';
import { StatusBar } from 'expo-status-bar';

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };

const { DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);
//TODO: change notch color to dark
function Layout() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    debug: false,
  });

  const paperTheme = CombinedDarkTheme;
  //colorScheme === 'light' ? CombinedDarkTheme : CombinedLightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={paperTheme as any}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
        <StatusBar />
      </ThemeProvider>
    </PaperProvider>
  );
}

export default Sentry.wrap(Layout);

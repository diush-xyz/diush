import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DarkTheme } from './core/style/Colors.style';
import Test from './core/components/Test';
import { ThemeProvider } from 'styled-components';
import AuthScreen from './core/screens/auth/Auth.screen';

export default function App() {
  return (
    <ThemeProvider theme={DarkTheme}>
      <View style={styles.container}>
        <AuthScreen />
        <StatusBar style='auto' />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkTheme.background,
    //TODO: Watch this:
    alignItems: 'center',
    color: DarkTheme.primaryText,
    //TODO: Watch this:
    justifyContent: 'center',
  },
});

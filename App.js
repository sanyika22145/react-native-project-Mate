import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Ez a projekt Bíró Bence felügyeletével jöhetett csak létre!</Text>
      <Text>Máté és Bence: Irigyeim sokan vagytok, mint a kutyák úgy ugattok!</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

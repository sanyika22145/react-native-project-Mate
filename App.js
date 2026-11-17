import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Bejegyzes from './components/bejegyzesek.js';
import useBejegyzesek from './hooks/useBejegyzesek.js';

export default function App() {
  const [cim, setCim] = useState('');
  const [hely, setHely] = useState('');
  const { bejegyzesek, betoltes, hozzaad, kedvencValt } = useBejegyzesek();

  const osszesDarab = bejegyzesek.length;
  const kedvencDarab = bejegyzesek.filter((b) => b.kedvenc).length;

  const ujBejegyzesHozzaadasa = () => {
    hozzaad(cim, hely);
    setCim('');
    setHely('');
  };

  return (
    <View style={styles.container}>
      <Text>
        Összesen: {osszesDarab} db | Kedvencek: {kedvencDarab} db
      </Text>
      <TextInput placeholder="Cím" value={cim} onChangeText={setCim} />
      <TextInput placeholder="Hely" value={hely} onChangeText={setHely} />
      <Button title="Hozzáadás" onPress={ujBejegyzesHozzaadasa} />
      {betoltes ? (
        <Text>Betöltés...</Text>
      ) : (
        bejegyzesek.map((elem, index) => (
          <Bejegyzes
            key={index}
            nev={elem.nev}
            hely={elem.hely}
            leiras={elem.leiras}
            kedvenc={elem.kedvenc}
            onKedvencValt={() => kedvencValt(index)}
          />
        ))
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#760000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

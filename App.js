import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Button, ScrollView, Text, TextInput } from 'react-native';
import Bejegyzes from './components/Bejegyzes.js';
import useBejegyzesek from './hooks/useBejegyzesek.js';

export default function App() {
  const [cim, setCim] = useState('');
  const [hely, setHely] = useState('');
  const [kereses, setKereses] = useState('');
  const [szuro, setSzuro] = useState('osszes');
  const { bejegyzesek, betoltes, hozzaad, kedvencValt } = useBejegyzesek();

  const osszesDarab = bejegyzesek.length;
  const kedvencDarab = bejegyzesek.filter((b) => b.kedvenc).length;

  const szurtBejegyzesek = useMemo(() => {
    const keresett = kereses.trim().toLowerCase();

    return bejegyzesek.filter((b) => {
      const talalat = b.cim.toLowerCase().includes(keresett) || b.hely.toLowerCase().includes(keresett);

      if (szuro === 'kedvencek') {
        return talalat && b.kedvenc;
      }
      if (szuro === 'nemKedvencek') {
        return talalat && !b.kedvenc;
      }
      return talalat;
    });
  }, [bejegyzesek, kereses, szuro]);

  const ujBejegyzesHozzaadasa = () => {
    if (cim.trim() === '' || hely.trim() === '') {
      return;
    }
    hozzaad(cim, hely);
    setCim('');
    setHely('');
  };

  return (
    <ScrollView style={{ marginTop: 50 }} keyboardShouldPersistTaps="handled">
      <Text>
        Összesen: {osszesDarab} db | Kedvencek: {kedvencDarab} db
      </Text>

      <TextInput placeholder="Cím" value={cim} onChangeText={setCim} />
      <TextInput placeholder="Hely" value={hely} onChangeText={setHely} />
      <Button title="Hozzáadás" onPress={ujBejegyzesHozzaadasa} />

      <TextInput placeholder="Keresés cím vagy hely alapján" value={kereses} onChangeText={setKereses} />
      <Button title="Összes" onPress={() => setSzuro('osszes')} />
      <Button title="Kedvencek" onPress={() => setSzuro('kedvencek')} />
      <Button title="Nem kedvencek" onPress={() => setSzuro('nemKedvencek')} />
      <Text>
        Szűrő: {szuro} | Találatok: {szurtBejegyzesek.length} db
      </Text>

      {betoltes ? (
        <Text>Betöltés...</Text>
      ) : (
        szurtBejegyzesek.map((elem) => (
          <Bejegyzes
            key={elem.id}
            cim={elem.cim}
            hely={elem.hely}
            leiras={elem.leiras}
            kedvenc={elem.kedvenc}
            onKedvencValt={() => kedvencValt(elem.id)}
          />
        ))
      )}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

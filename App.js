import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Bejegyzes from './components/Bejegyzes.js';
import useBejegyzesek from './hooks/useBejegyzesek.js';

export default function App() {
  const [cim, setCim] = useState('');
  const [hely, setHely] = useState('');
  const [hiba, setHiba] = useState(false);
  const [keresesSzoveg, setKeresesSzoveg] = useState('');
  const [kereses, setKereses] = useState('');
  const [szuro, setSzuro] = useState('osszes');
  const { bejegyzesek, betoltes, hozzaad, kedvencValt } = useBejegyzesek();

  const osszesDarab = bejegyzesek.length;
  const kedvencDarab = bejegyzesek.filter((b) => b.kedvenc).length;
  const gombStilus = ({ pressed }) => [styles.gomb, pressed && styles.lenyomottGomb];

  const szurtBejegyzesek = useMemo(() => {
    const keresett = kereses.trim().toLowerCase();
    return bejegyzesek.filter((b) => {
      const talalat = b.cim.toLowerCase().includes(keresett) || b.hely.toLowerCase().includes(keresett);
      if (szuro === 'kedvencek') return talalat && b.kedvenc;
      if (szuro === 'nemKedvencek') return talalat && !b.kedvenc;
      return talalat;
    });
  }, [bejegyzesek, kereses, szuro]);

  const ujBejegyzesHozzaadasa = () => {
    if (cim.trim() === '' || hely.trim() === '') {
      setHiba(true);
      return;
    }
    setHiba(false);
    hozzaad(cim, hely);
    setCim('');
    setHely('');
  };

  return (
    <ScrollView style={{ marginTop: 50, backgroundColor: '#fff' }} keyboardShouldPersistTaps="handled">
      <View style={[styles.statisztika]}>
        <Text>Összesen: {osszesDarab} db</Text>
        <Text>Kedvencek: {kedvencDarab} db</Text>
      </View>
      <TextInput
        style={[styles.input, hiba && cim.trim() === '' && styles.hibaInput]}
        placeholder="Cím"
        value={cim}
        onChangeText={setCim}
      />
      <TextInput
        style={[styles.input, hiba && hely.trim() === '' && styles.hibaInput]}
        placeholder="Hely"
        value={hely}
        onChangeText={setHely}
      />
      <Pressable onPress={ujBejegyzesHozzaadasa} style={gombStilus}>
        <Text>Hozzáadás</Text>
      </Pressable>
      <View style={[styles.bevitel]}>
        <TextInput
          style={[styles.input, styles.kereso]}
          placeholder="Keresés cím vagy hely alapján"
          value={keresesSzoveg}
          onChangeText={setKeresesSzoveg}
        />
        <Pressable onPress={() => setKereses(keresesSzoveg)} style={gombStilus}>
          <Text>Keresés</Text>
        </Pressable>
      </View>
      <Pressable onPress={() => setSzuro('osszes')} style={gombStilus}>
        <Text>Összes</Text>
      </Pressable>
      <Pressable onPress={() => setSzuro('kedvencek')} style={gombStilus}>
        <Text>Kedvencek</Text>
      </Pressable>
      <Pressable onPress={() => setSzuro('nemKedvencek')} style={gombStilus}>
        <Text>Nem kedvencek</Text>
      </Pressable>
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

const styles = StyleSheet.create({
  statisztika: {
    flex: 1,
    gap: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
  },
  hibaInput: {
    borderColor: 'red',
  },
  kereso: {
    flex: 1,
  },
  bevitel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gomb: {
    borderWidth: 1,
    padding: 8,
    alignItems: 'center',
  },
  lenyomottGomb: {
    opacity: 0.5,
  },
});

import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Bejegyzes from './components/Bejegyzes.js';
import Gomb from './components/Gomb.js';
import useBejegyzesek from './hooks/useBejegyzesek.js';
import { szinek, tavolsag } from './theme.js';

export default function App() {
  const [cim, setCim] = useState('');
  const [hely, setHely] = useState('');
  const [kep, setKep] = useState('');
  const [hiba, setHiba] = useState(false);
  const [keresesSzoveg, setKeresesSzoveg] = useState('');
  const [kereses, setKereses] = useState('');
  const [szuro, setSzuro] = useState('osszes');
  const { bejegyzesek, betoltes, hozzaad, kedvencValt } = useBejegyzesek();
  const { width } = useWindowDimensions();
  const oszlopSzam = width >= 600 ? 2 : 1;
  const osszesDarab = bejegyzesek.length;
  const kedvencDarab = bejegyzesek.filter((b) => b.kedvenc).length;
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
    hozzaad(cim, hely, kep.trim());
    setCim('');
    setHely('');
    setKep('');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={{ marginTop: tavolsag.statisztikaKoz, backgroundColor: szinek.hatter }}
          contentContainerStyle={styles.listaTartalom}
          keyboardShouldPersistTaps="handled"
        >
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
          <TextInput style={[styles.input]} placeholder="Kép URL (nem kötelező)" value={kep} onChangeText={setKep} />
          <Gomb cim="Hozzáadás" onPress={ujBejegyzesHozzaadasa} />
          <View style={[styles.bevitel]}>
            <TextInput
              style={[styles.input, styles.kereso]}
              placeholder="Keresés cím vagy hely alapján"
              value={keresesSzoveg}
              onChangeText={setKeresesSzoveg}
            />
            <Gomb cim="Keresés" onPress={() => setKereses(keresesSzoveg)} />
          </View>
          <Gomb cim="Összes" onPress={() => setSzuro('osszes')} tipus="masodlagos" />
          <Gomb cim="Kedvencek" onPress={() => setSzuro('kedvencek')} tipus="masodlagos" />
          <Gomb cim="Nem kedvencek" onPress={() => setSzuro('nemKedvencek')} tipus="masodlagos" />
          <Text>
            Szűrő: {szuro} | Találatok: {szurtBejegyzesek.length} db
          </Text>
          {betoltes ? (
            <Text>Betöltés...</Text>
          ) : (
            <View style={[oszlopSzam === 2 && styles.ketOszlop]}>
              {szurtBejegyzesek.map((elem) => (
                <Bejegyzes
                  key={elem.id}
                  cim={elem.cim}
                  hely={elem.hely}
                  leiras={elem.leiras}
                  kedvenc={elem.kedvenc}
                  kep={elem.kep}
                  onKedvencValt={() => kedvencValt(elem.id)}
                  style={oszlopSzam === 2 && styles.ketOszlopKartya}
                />
              ))}
            </View>
          )}
          <StatusBar style="auto" />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: szinek.hatter,
  },
  listaTartalom: {
    padding: tavolsag.extraNagy,
    gap: tavolsag.kozepes,
  },
  statisztika: {
    flex: 1,
    gap: tavolsag.statisztikaKoz,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    padding: tavolsag.kozepes,
    borderRadius: tavolsag.kicsi,
  },
  hibaInput: {
    borderColor: szinek.hiba,
  },
  kereso: {
    flex: 1,
  },
  bevitel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ketOszlop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  ketOszlopKartya: {
    width: '48%',
  },
});

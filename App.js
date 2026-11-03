import { StatusBar } from 'expo-status-bar';
import Bejegyzesek from './components/bejegyzesek.js';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { use, useState } from 'react';


export default function App() {


  const [cim,setCim] =useState('');
  const [hely,setHely] =useState('');
  const [bejegyzesek,setBejegyzesek] = useState([
    {nev: 'Lajos', hely:'1.hely', kedvenc: false},
    {nev: 'Feri', hely:'2.hely', kedvenc: false},
    {nev: 'Károly', hely:'3.hely', kedvenc: false},
  ]);
  const osszesDarab = bejegyzesek.length;
  const kedvencDarab = bejegyzesek.filter((b)=> b.kedvenc).length;
  const hozzaad = () => {
        const ujBejegyzes = { nev: cim, hely: hely,
        kedvenc: false }; 
        setBejegyzesek((b) => [...b, ujBejegyzes]);
        setCim(''); 
        setHely('');
  };
 const kedvencValt = (index) => {
      setBejegyzesek((b) => { 
        return b.map((elem, i) => {
          if (i === index) { 
            return { ...elem, kedvenc: !elem.kedvenc };
          } else {
            return elem;
          }
        });
      });
    };
  return (
  
    <View style={styles.container}>
      <Text>                                                  
        Összesen: {osszesDarab} db | Kedvencek: {kedvencDarab} db                                                    
      </Text> 
      <TextInput placeholder="Cím" value={cim} onChangeText={setCim}/>
      <TextInput placeholder="Hely" value={hely} onChangeText={setHely}/>
      <Button title="Hozzáadás" onPress={hozzaad} /> 
      <Bejegyzesek nev="Lajos" hely="Parád" leiras="valami leiras0" />
      <Bejegyzesek nev="Feri" hely="Ózd"/>
      <Bejegyzesek nev="Bence" hely="Szentadnrás" leiras="valami leiras2" />
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

import { Button, StyleSheet, Text, View } from 'react-native';

export default function Bejegyzes({ cim, hely, leiras, kedvenc, onKedvencValt }) {
  return (
    <View style={[styles.kartya, kedvenc && styles.kedvenc]}>
      <Text style={[styles.cim]}>{cim}</Text>
      <Text style={[styles.hely]}>Helyszín: <Text >{hely}</Text></Text>
      
      {leiras ? <Text style={[styles.leiras]} >{leiras}</Text> : null}
      <Button title={kedvenc ? 'Kedvenc törlése' : 'Kedvencnek jelöl'} onPress={onKedvencValt} />
    </View>
  );
}

const styles = StyleSheet.create({
  kartya: {
    padding: 16,
    borderRadius: 12,
    margin: 16,
    borderWidth: 4,
  },
  cim: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  hely:{
    color: 'gray',

  },
  szin:{
    numberOflines: 2,

  },
  kedvenc:{
    borderLeftColor: 'yellow',
  }
  
});

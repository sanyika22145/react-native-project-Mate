import { Image, StyleSheet, Text, View } from 'react-native';
import { betumeret, szinek, tavolsag } from '../theme.js';
import Gomb from './Gomb.js';

export default function Bejegyzes({ cim, hely, leiras, kedvenc, kep, onKedvencValt }) {
  return (
    <View style={[styles.kartya, kedvenc && styles.kedvenc]}>
      {kep ? (
        <View style={styles.kepKontener}>
          <Image source={{ uri: kep }} style={styles.kep} />
          {kedvenc ? <Text style={styles.csillag}>★</Text> : null}
        </View>
      ) : null}
      <View style={[styles.sor]}>
        <Text style={[styles.cim]}>{cim}</Text>
        <Gomb
          cim={kedvenc ? 'Kedvenc törlése' : 'Kedvencnek jelöl'}
          onPress={onKedvencValt}
          tipus={kedvenc ? 'veszelyes' : 'masodlagos'}
        />
      </View>
      <View>
        <Text style={[styles.hely]}>
          Helyszín: <Text>{hely}</Text>
        </Text>
        {leiras ? <Text style={[styles.leiras]}>{leiras}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  kartya: {
    padding: tavolsag.extraNagy,
    borderRadius: tavolsag.nagy,
    margin: tavolsag.extraNagy,
    borderWidth: 4,
    alignItems: 'center',
    flex: 1,
  },
  kepKontener: {
    width: '100%',
    position: 'relative',
  },
  kep: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  csillag: {
    position: 'absolute',
    top: tavolsag.kozepes,
    right: tavolsag.kozepes,
    color: szinek.kedvenc,
    fontSize: betumeret.cim,
  },
  sor: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cim: {
    fontWeight: 'bold',
    fontSize: betumeret.cim,
    flex: 1,
  },
  hely: {
    color: szinek.szurke,
  },
  szin: {
    numberOflines: 2,
  },
  kedvenc: {
    borderLeftColor: szinek.kedvenc,
  },
});

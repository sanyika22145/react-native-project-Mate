import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Bejegyzes({ cim, hely, leiras, kedvenc, onKedvencValt }) {
  return (
    <View style={[styles.kartya, kedvenc && styles.kedvenc]}>
      <View style={[styles.sor]}>
        <Text style={[styles.cim]}>{cim}</Text>
        <Pressable onPress={onKedvencValt} style={({ pressed }) => [styles.gomb, pressed && styles.lenyomottGomb]}>
          <Text>{kedvenc ? 'Kedvenc törlése' : 'Kedvencnek jelöl'}</Text>
        </Pressable>
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
    padding: 16,
    borderRadius: 12,
    margin: 16,
    borderWidth: 4,
    alignItems: 'center',
    flex: 1,
  },
  sor: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cim: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
  },
  hely: {
    color: 'gray',
  },
  szin: {
    numberOflines: 2,
  },
  kedvenc: {
    borderLeftColor: 'yellow',
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

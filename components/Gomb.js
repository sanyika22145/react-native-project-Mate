import { Pressable, StyleSheet, Text } from 'react-native';
import { betumeret, szinek, tavolsag } from '../theme.js';

export default function Gomb({ cim, onPress, tipus = 'elsodleges', style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.gomb, styles[tipus], pressed && styles.lenyomottGomb, style]}
    >
      <Text style={styles.szoveg}>{cim}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gomb: {
    borderWidth: 1,
    padding: tavolsag.kozepes,
    alignItems: 'center',
  },
  elsodleges: {
    backgroundColor: szinek.elsodleges,
  },
  masodlagos: {
    backgroundColor: szinek.masodlagos,
  },
  veszelyes: {
    backgroundColor: szinek.veszelyes,
  },
  lenyomottGomb: {
    opacity: 0.5,
  },
  szoveg: {
    fontSize: betumeret.alap,
  },
});

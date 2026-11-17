import { Text, Button } from 'react-native';

export default function Bejegyzes({ nev, hely, leiras, kedvenc, onKedvencValt }) {
  return (
    <>
      <Text>
        Sziaa, {nev}, {hely} {kedvenc ? '*' : ''}
      </Text>
      {leiras && <Text>{leiras}</Text>}
      <Button title={kedvenc ? 'Kedvenc törlése' : 'Kedvencnek jelöl'} onPress={onKedvencValt} />
    </>
  );
}

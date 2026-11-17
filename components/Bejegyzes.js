import { Button, Text, View } from 'react-native';

export default function Bejegyzes({ cim, hely, leiras, kedvenc, onKedvencValt }) {
  return (
    <View>
      <Text>
        {cim} {kedvenc ? '*' : ''}
      </Text>
      <Text>{hely}</Text>
      {leiras ? <Text>{leiras}</Text> : null}
      <Button title={kedvenc ? 'Kedvenc törlése' : 'Kedvencnek jelöl'} onPress={onKedvencValt} />
    </View>
  );
}

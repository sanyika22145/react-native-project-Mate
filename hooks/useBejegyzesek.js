import { useEffect, useState } from 'react';

const mintaBejegyzesek = [
  {
    id: '1',
    cim: 'Balatoni hétvége',
    hely: 'Siófok',
    leiras: 'Strandolás és lángos.',
    kedvenc: false,
    kep: 'https://picsum.photos/seed/lake/600/400',
  },
  {
    id: '2',
    cim: 'Városnézés',
    hely: 'Bécs',
    kedvenc: true,
    kep: 'https://picsum.photos/seed/wienna/600/400',
  },
  { id: '3', cim: 'Kirándulás', hely: 'Mátra', leiras: 'Túra a Kékestetőre.', kedvenc: false },
];

function useBejegyzesek() {
  const [bejegyzesek, setBejegyzesek] = useState([]);
  const [betoltes, setBetoltes] = useState(true);

  useEffect(() => {
    const idozito = setTimeout(() => {
      setBejegyzesek(mintaBejegyzesek);
      setBetoltes(false);
    }, 500);

    return () => clearTimeout(idozito);
  }, []);

  const hozzaad = (cim, hely, kep) => {
    const ujBejegyzes = {
      id: Date.now().toString(),
      cim,
      hely,
      kedvenc: false,
      ...(kep ? { kep } : {}),
    };
    setBejegyzesek((b) => [...b, ujBejegyzes]);
  };

  const kedvencValt = (id) => {
    setBejegyzesek((b) => b.map((elem) => (elem.id === id ? { ...elem, kedvenc: !elem.kedvenc } : elem)));
  };

  return { bejegyzesek, betoltes, hozzaad, kedvencValt };
}

export default useBejegyzesek;

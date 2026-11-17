import { useEffect, useState } from 'react';

const kezdetiBejegyzesek = [
  { nev: 'Lajos', hely: '1.hely', kedvenc: false },
  { nev: 'Feri', hely: '2.hely', kedvenc: false },
  { nev: 'Károly', hely: '3.hely', kedvenc: false },
];

function useBejegyzesek() {
  const [bejegyzesek, setBejegyzesek] = useState([]);
  const [betoltes, setBetoltes] = useState(true);

  useEffect(() => {
    const idozito = setTimeout(() => {
      setBejegyzesek(kezdetiBejegyzesek);
      setBetoltes(false);
    }, 500);

    return () => clearTimeout(idozito);
  }, []);

  const hozzaad = (cim, hely) => {
    const ujBejegyzes = {
      nev: cim,
      hely,
      kedvenc: false,
    };
    setBejegyzesek((elozo) => [...elozo, ujBejegyzes]);
  };

  const kedvencValt = (index) => {
    setBejegyzesek((elozo) => elozo.map((elem, i) => (i === index ? { ...elem, kedvenc: !elem.kedvenc } : elem)));
  };

  return {
    bejegyzesek,
    betoltes,
    hozzaad,
    kedvencValt,
  };
}

export default useBejegyzesek;

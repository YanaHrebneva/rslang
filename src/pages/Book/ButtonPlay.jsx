import React from 'react';
import { BASE_URL } from '../../constants/url';

export function ButtonPlay({ urlArr }) {
  const arr = [...urlArr];
  const allAudio = arr.map((fileMp3) => new Audio(BASE_URL + fileMp3));

  const funk = (audio) => new Promise((resolve) => {
    audio.play();
    audio.addEventListener('ended', () => resolve());
  });

  const autoPlay = async () => {
    for (let i = 0; i < allAudio.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await funk(allAudio[i]);
    }
  };

  return (
    <button type="button" onClick={autoPlay}>
      play
    </button>
  );
}

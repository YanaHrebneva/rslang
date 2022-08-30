import { Button } from '@mui/material';
import React from 'react';
import { BASE_URL } from '../../constants/url';
import UserApi from '../../services/UserApi';

function ButtonsActions({ urlArr, user, id }) {
  const arr = [...urlArr];
  const allAudio = arr.map((fileMp3) => new Audio(BASE_URL + fileMp3));

  const Play = (audio) => new Promise((resolve) => {
    audio.play();
    audio.addEventListener('ended', () => resolve());
  });

  const autoPlay = async () => {
    for (let i = 0; i < allAudio.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await Play(allAudio[i]);
    }
  };

  return (
    <>
      <Button onClick={autoPlay}>Play</Button>
      <Button
        onClick={() => UserApi.addedUserHardWord(user.id, id)}
        disabled={!user}
      >
        hard word

      </Button>
      <Button disabled={!user}>learned word</Button>
    </>
  );
}

export default ButtonsActions;

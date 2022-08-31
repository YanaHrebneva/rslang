import { Button } from '@mui/material';
import React from 'react';
import { BASE_URL } from '../../constants/url';
import UserApi from '../../services/UserApi';

function ButtonsActions({
  urlArr, user, id, difficulty, toggleState,
}) {
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
  const toggleHardEasyWord = async () => {
    switch (difficulty) {
      case !difficulty:
        await UserApi.addedUserHardWord(user.id, id);
        toggleState();
        break;
      case 'hard':
        await UserApi.toggleDifficultyUserWord(user.id, id, 'easy');
        toggleState();
        break;
      case 'easy':
        await UserApi.toggleDifficultyUserWord(user.id, id, 'hard');
        toggleState();
        break;

      default:
        break;
    }

    // if (!difficulty) {
    //   await UserApi.addedUserHardWord(user.id, id);
    //   toggleState();
    //   return;
    // }
    // if (difficulty === 'hard') {
    //   console.log('easy');
    //   await UserApi.toggleDifficultyUserWord(user.id, id, 'easy');
    //   toggleState();
    //   return;
    // }
    // if (difficulty === 'easy') {
    //   console.log('hard');
    //   await UserApi.toggleDifficultyUserWord(user.id, id, 'hard');
    //   toggleState();
    // }
  };

  return (
    <>
      <Button onClick={autoPlay}>Play</Button>
      <Button
        onClick={() => toggleHardEasyWord()}
        disabled={!user}
      >
        {difficulty === 'hard' ? 'hard word' : 'add hard word'}

      </Button>
      <Button onClick={() => toggleHardEasyWord()} disabled={!user}>
        {difficulty === 'hard' ? 'add easy' : 'easy'}
      </Button>
    </>
  );
}

export default ButtonsActions;

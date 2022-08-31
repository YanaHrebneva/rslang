import { Button } from '@mui/material';
import React, { useState } from 'react';
import { BASE_URL } from '../../constants/url';
import UserApi from '../../services/UserApi';

function ButtonsActions({
  urlArr, user, id, toggleState, groups,
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
  // const toggleHardEasyWord = async (params = difficulty) => {
  //   const complexity = params;
  //   switch (complexity) {
  //     case 'hard':
  //       await UserApi.toggleDifficultyUserWord(user.id, id, 'easy');
  //       toggleState();
  //       break;
  //     case 'easy':
  //       await UserApi.toggleDifficultyUserWord(user.id, id, 'hard');
  //       toggleState();
  //       break;

  //     default:
  //       break;
  //   }

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
  // };
  const [btnState, setBtnState] = useState(false);
  const createStateWord = async (stateWord) => {
    await UserApi.createStateWordUser(user.id, id, stateWord);
    toggleState();
    setBtnState(true);
  };

  const changeStateWord = async (stateWord) => {
    await UserApi.changeStateWordUser(user.id, id, stateWord);
    toggleState();
    setBtnState(true);
  };

  return (
    <>
      <Button onClick={autoPlay}>Play</Button>
      {user ? (
        <>
          <Button
            onClick={() => (groups === 7 ? changeStateWord('easy') : createStateWord('hard'))}
            disabled={btnState}
          >
            {groups === 7 ? 'del hard' : 'add hard'}
          </Button>
          <Button
            disabled={btnState}
            onClick={() => (groups === 7 ? changeStateWord('easy') : createStateWord('easy'))}
          >
            learned
          </Button>
        </>
      ) : (
        <>
          <Button disabled={!user}>add hard</Button>
          <Button disabled={!user}>easy word</Button>
        </>
      )}
    </>
  );
}

export default ButtonsActions;

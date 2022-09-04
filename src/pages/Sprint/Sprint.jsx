import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { mainTheme } from '../../utils/theme';
import LevelPick from '../../components/LevelPick';
import WordsService from '../../services/WordsService';
import SprintGame from '../../components/SprintGame';
import AudioScore from '../../components/AudioScore';

import {
  generateRandomIndexes, getRandomIndexesExceptCurrent, mix, randomNumber,
} from '../../utils/random';

const generateGameSetup = (wordsArray) => {
  const gameWordsIndexes = generateRandomIndexes(10)
    .map((i) => ({
      variants: getRandomIndexesExceptCurrent(20, 4, i),
      index: i,
    }));

  const gameWords = gameWordsIndexes.map((e) => {
    const variants = [...e.variants, e.index].map((v) => ({
      word: wordsArray[v].wordTranslate,
      id: wordsArray[v].id,
    }));

    return {
      ...wordsArray[e.index],
      variants: mix(variants),
    };
  });

  return gameWords;
};

export default function Sprint() {
  const [currentStep, setCurrentStep] = useState(1);
  const [words, setWords] = useState([]);
  const [gameScore, setGameScore] = useState();
  const { state } = useLocation();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (state?.page && state?.groups) {
      WordsService.getWords(state.groups - 1, state.page - 1)
        .then((result) => {
          setWords(result.data);
          setCurrentStep(2);
          setInitialLoad(false);
        });
    } else {
      setInitialLoad(false);
    }
  }, [state]);

  const iterateGameStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleGroupSelect = async (groupId) => {
    const result = await WordsService.getWords(groupId, randomNumber(0, 29));
    setWords(result.data);
    iterateGameStep();
  };

  const handleGameEnd = (result) => {
    setGameScore(result);
    iterateGameStep();
  };

  const handlePlayAgain = () => {
    setCurrentStep(1);
  };

  let gameComponent = '';
  switch (currentStep) {
    case 3:
      gameComponent = (
        <AudioScore gameScore={gameScore} onPlayAgain={handlePlayAgain} />
      );
      break;
    case 2:
      gameComponent = (
        <SprintGame wordsPool={generateGameSetup(words)} onEnd={handleGameEnd} />
      );
      break;
    case 1:
    default:
      gameComponent = (
        <LevelPick
          title="Спринт"
          description="Тренировка для повторения значений слов"
          onSelect={handleGroupSelect}
        />
      );
  }

  return (
    <ThemeProvider theme={mainTheme}>
      {!initialLoad && gameComponent}
    </ThemeProvider>

  );
}

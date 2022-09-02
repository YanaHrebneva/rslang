import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { mainTheme } from '../../utils/theme';
import LevelPick from '../../components/LevelPick';
import WordsService from '../../services/WordsService';
import AudioCallGame from '../../components/AudioCallGame';
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

export default function AudioCall() {
  const [currentStep, setCurrentStep] = useState(1);
  const [words, setWords] = useState([]);
  const [gameScore, setGameScore] = useState();
  // console.log(gameScore);
  // if (gameScore) gameScore.filter((el) => console.log(el.right));

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
        <AudioCallGame wordsPool={generateGameSetup(words)} onEnd={handleGameEnd} />
      );
      break;
    case 1:
    default:
      gameComponent = (
        <LevelPick
          title="Аудиовызов"
          description="Тренировка Аудиовызов улучшает твое восприятие речи на слух"
          onSelect={handleGroupSelect}
        />
      );
  }

  return (
    <ThemeProvider theme={mainTheme}>
      {gameComponent}
    </ThemeProvider>

  );
}

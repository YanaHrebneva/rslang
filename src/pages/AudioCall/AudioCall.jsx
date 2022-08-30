import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { mainTheme } from '../../utils/theme';
import LevelPick from '../../components/LevelPick';
import WordsService from '../../services/WordsService';
import { randomNumber } from '../../utils/random';
import AudioCallGame from '../../components/AudioCallGame';

export default function AudioCall() {
  const [currentStep, setCurrentStep] = useState(1);
  const [words, setWords] = useState([]);

  const iterateGameStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleGroupSelect = async (groupId) => {
    const result = await WordsService.getWords(groupId, randomNumber(0, 29));
    setWords(result.data);
    iterateGameStep();
  };

  let gameComponent = '';
  switch (currentStep) {
    case 3:
      gameComponent = (
        <div>Score</div>
      );
      break;
    case 2:
      gameComponent = (
        <AudioCallGame wordsPool={words} />
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

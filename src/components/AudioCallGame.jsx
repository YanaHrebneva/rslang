import React from 'react';
import { generateRandomIndexes, getRandomIndexesExceptCurrent, mix } from '../utils/random';

export default function AudioCallGame({ wordsPool }) {
  const gameWordsIndexes = generateRandomIndexes(10)
    .map((i) => ({
      variants: getRandomIndexesExceptCurrent(20, 4, i),
      index: i,
    }));

  const gameWords = gameWordsIndexes.map((e) => {
    const variants = e.variants.map((v) => ({
      word: wordsPool[v].wordTranslate,
    }));

    variants.push({
      word: wordsPool[e.index].wordTranslate,
      isRight: true,
    });

    return {
      ...wordsPool[e.index],
      variants: mix(variants),
    };
  });

  return (
    <>
      {gameWords[0].word}
      {gameWords[0].variants.map((v) => `${v.word} ${v.isRight}|`)}
    </>
  );
}

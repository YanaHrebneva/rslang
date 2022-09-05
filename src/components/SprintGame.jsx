/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Grid, Button, Box } from '@mui/material';
// import { baseUrl } from '../utils/axios';

export default function SprintGame({ wordsPool, onEnd }) {
  const [words] = useState(wordsPool);
  const [selectedWord, setSelectedWord] = useState();
  const [result] = useState([]);
  let [myVariant] = useState();
  let [myWord]= useState();
  console.log(words);

  const showNextWord = (answer) => {
    result.push({
      word: words[0].word,
      id: words[0].id,
      translate: words[0].wordTranslate,
      isCorrect: answer,
    });
    setSelectedWord(words[0].word);
    words.shift();
    if (words.length === 0) {
      onEnd(result);
    }
  };

  const handleChoose = (e, type) => {
    let answer = false;
    if (type === 'correct') {
      if (myWord.id === myVariant.id) {
        answer = true;
      }
    } else if (type === 'incorrect') {
      if (myWord.id !== myVariant.id) {
        answer = true;
      }
    }

      // if (e.target.value === true && words[0].wordTranslate === word.variants[1].word) {
      //   setSelectedWord({ ...words[0], right: true });
      // } else {
      //   setSelectedWord({ id: e.target.value, right: false });
      // }
    console.log(myWord);
    console.log(myVariant);
    console.log(answer);
    showNextWord(answer);
  };

  const chooseWord = (word) => {
    myWord = word;
    return word.word;
  };

  const chooseVariant = (word) => {
    const variant = word;
    myVariant = variant;
    return variant.word;
  };

  return (
    <Box
      height="70%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Grid border="1px solid var(--color-menu-font)" padding="5rem">
        {/* {!selectedWord && */}
          <div>
            {chooseWord(words[0])}
            <br />
            {chooseVariant(words[0].variants[0 || 1])}
          </div>
        <Grid container justifyContent="center" mt={6} mb={6}>
          <Grid>
            <Button
              style={{
                color: 'green',
                borderColor: 'green',
              }}
              variant="outlined"
              value="true"
              onClick={e => handleChoose(e, "correct")}
            >
              ВЕРНО
            </Button>
            <Button
              variant="outlined"
              value="false"
              onClick={e => handleChoose(e, "incorrect")}
            >
              НЕВЕРНО
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

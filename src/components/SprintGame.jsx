import React, { useState } from 'react';
import {
  Grid, Button, Box,
} from '@mui/material';
// import { baseUrl } from '../utils/axios';

export default function SprintGame({ wordsPool, onEnd }) {
  const [words] = useState(wordsPool);
  const [selectedWord, setSelectedWord] = useState();
  const [result] = useState([]);

  const showNextWord = () => {
    result.push({
      word: words[0].word,
      id: words[0].id,
      translate: words[0].wordTranslate,
    });
    words.shift();
    setSelectedWord(null);
    if (words.length === 0) {
      onEnd(result);
    }
  };

  const handleChoose = (e) => {
    if (!selectedWord) {
      if (e.target.value === words[0].id) {
        setSelectedWord({ ...words[0], right: true });
      } else {
        setSelectedWord({ id: e.target.value, right: false });
      }
    }
    showNextWord();
  };

  return (
    <Box
      height="70%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Grid border="1px solid var(--color-menu-font)" padding="5rem">
        {!selectedWord
          && (
          <div>
            {words[0].word}
            <br />
            {words[Math.floor(Math.random() * 10)].wordTranslate}
          </div>
          )}
        <Grid container justifyContent="center" mt={6} mb={6}>
          <Grid>
            <Button
              style={{
                color: 'green',
                borderColor: 'green',
              }}
              variant="outlined"
              value="true"
              onClick={handleChoose}
            >
              ВЕРНО
            </Button>
            <Button variant="outlined" value="false" onClick={handleChoose}>
              НЕВЕРНО
            </Button>
          </Grid>
        </Grid>
      </Grid>

    </Box>
  );
}

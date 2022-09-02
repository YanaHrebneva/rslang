import React, { useState } from 'react';
import {
  Avatar, IconButton, Grid, Button, Box,
} from '@mui/material';
import { baseUrl } from '../utils/axios';

export default function AudioCallGame({ wordsPool, onEnd }) {
  const [words] = useState(wordsPool);
  const [selectedWord, setSelectedWord] = useState();
  const [result] = useState([]);

  const handleChoose = (e) => {
    if (!selectedWord) {
      if (e.target.value === words[0].id) {
        setSelectedWord({ ...words[0], right: true });
      } else {
        setSelectedWord({ id: e.target.value, right: false });
      }
    }
  };

  const showAnswers = () => {
    setSelectedWord({});
  };

  const defineButtonColor = (id) => {
    if (selectedWord) {
      if (id === words[0].id) {
        return 'success';
      }
      if (selectedWord.id === id) {
        return 'error';
      }
    }
    return 'secondary';
  };

  const showNextWord = () => {
    result.push({
      word: words[0].word,
      id: words[0].id,
      right: selectedWord.right,
      audio: words[0].audio,
      translate: words[0].wordTranslate,
    });
    words.shift();
    setSelectedWord(null);
    if (words.length === 0) {
      onEnd(result);
    }
  };

  const audio = new Audio(`${baseUrl}/${words[0].audio}`);
  return (
    <Box
      height="70%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Grid>
        {!selectedWord
          && (
          <div>
            {/* {gameWords[0].word} */}
            <IconButton onClick={() => audio.play()} sx={{ width: 200, height: 200 }}>
              <Avatar src="./assets/images/icon-sound.png" sx={{ width: 100, height: 100 }} />
            </IconButton>
          </div>
          )}
        {selectedWord && (
          <div>
            <img src={`${baseUrl}/${words[0].image}`} alt={words[0].word} />
            <div>
              <IconButton onClick={() => audio.play()}>
                <Avatar src="./assets/images/icon-sound.png" />
              </IconButton>
              {words[0].word}
            </div>
          </div>
        )}
        <Grid container justifyContent="center" spacing={4} mt={6} mb={6}>
          {words[0].variants.map((v, i) => (
            <Grid item key={v.id}>
              <Button variant="outlined" value={v.id} color={defineButtonColor(v.id)} onClick={handleChoose}>
                {`${i + 1}  ${v.word}`}
              </Button>
            </Grid>
          ))}
        </Grid>
        {selectedWord && (
          <Button onClick={showNextWord}>
            Далее &rarr;
          </Button>
        )}
        {!selectedWord && (
          <Button onClick={showAnswers}>
            Не знаю
          </Button>
        )}
      </Grid>

    </Box>
  );
}

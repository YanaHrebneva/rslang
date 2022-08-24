import {
  Button, Container, Pagination, Stack,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function BookPage() {
  const [words, setWords] = useState([]);
  const [page, setPage] = useState(1);
  const [groups, setGroups] = useState(1);
  const [pageQty, setPageQty] = useState(0);

  useEffect(() => {
    const baseUrl = 'https://rslang-yanahrebneva.herokuapp.com/words?';
    axios.get(`${baseUrl}group=${groups - 1}&page=${page - 1}`).then(({ data }) => {
      const allWords = data;
      console.log(data);
      setWords(allWords);
      const pageQtyLength = allWords.length;
      setPageQty(pageQtyLength);
    });
  }, [page, groups]);

  return (
    <Container>
      <Button onClick={() => { setGroups(1); setPage(1); }} variant="contained">Contained 1</Button>
      <Button onClick={() => { setGroups(2); setPage(1); }} variant="contained">Contained 2</Button>
      <Button onClick={() => { setGroups(3); setPage(1); }} variant="contained">Contained 3</Button>
      <Button onClick={() => { setGroups(4); setPage(1); }} variant="contained">Contained 4</Button>
      <Button onClick={() => { setGroups(5); setPage(1); }} variant="contained">Contained 5</Button>

      <Stack spacing={2}>
        {!!pageQty && (
          <Pagination
            count={30}
            page={page}
            onChange={(_, num) => setPage(num)}
            showLastButton
            showFirstButton
            sx={{ marginY: 3, marginX: 'auto' }}
          />
        )}
        {words.map((word) => (
          <div key={word.id} className="card">
            <div className="card-body">
              <h3>
                {`${word.word} ${word.transcription}`}
                <span>Play</span>
              </h3>
              <img src={`https://rslang-yanahrebneva.herokuapp.com/${word.image}`} alt="" />
              <p dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
              <p>{word.textMeaningTranslate}</p>
              <p dangerouslySetInnerHTML={{ __html: word.textExample }} />
              <p>{word.textExampleTranslate}</p>
            </div>
          </div>

        ))}
      </Stack>
    </Container>
  );
}

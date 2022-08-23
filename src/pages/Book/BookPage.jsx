import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function BookPage() {
  const [words, setWords] = useState();
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
    <div>{console.log(words)}</div>
  );
}

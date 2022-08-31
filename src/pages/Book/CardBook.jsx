import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { BASE_URL } from '../../constants/url';
import ButtonsActions from './ButtonsActions';

export default function CardBook(props) {
  const {
    groups,
    toggleState,
    userWord,
    id,
    wordTranslate,
    word, transcription, image, textMeaning,
    textMeaningTranslate, textExampleTranslate,
    textExample, audio, audioExample, audioMeaning, user,
  } = props;

  const toggleStyle = () => {
    const difficulty = userWord?.difficulty;
    switch (difficulty) {
      case !difficulty:
        break;
      case 'hard':
        return ({ backgroundColor: 'red' });
      case 'easy':
        return ({ backgroundColor: 'green' });
      default:
        break;
    }
  };

  return (
    <Card
      id={id}
      sx={[
        { height: '100%', display: 'flex', flexDirection: 'column' },
        // console.log(toggleStyle()),
        toggleStyle(),

      ]}
    >
      <CardMedia
        component="img"
        image={`${BASE_URL}${image}`}
        alt={word}
      />
      <CardActionArea sx={{ flexGrow: 1 }}>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${word} ${transcription}`}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {`${wordTranslate}`}
          </Typography>
          <Typography dangerouslySetInnerHTML={{ __html: textMeaning }} gutterBottom variant="subtitle1" component="div" />
          <Typography gutterBottom variant="subtitle2" component="div">
            {textMeaningTranslate}
          </Typography>
          <Typography dangerouslySetInnerHTML={{ __html: textExample }} gutterBottom variant="subtitle1" component="div" />
          <Typography gutterBottom variant="subtitle2" component="div">
            {textExampleTranslate}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" />
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <ButtonsActions
          toggleState={toggleState}
          difficulty={userWord?.difficulty}
          groups={groups}
          id={id}
          user={user}
          urlArr={[audio, audioMeaning, audioExample]}
        />
      </CardActions>
    </Card>
  );
}

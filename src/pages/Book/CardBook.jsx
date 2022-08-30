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
    id,
    word, transcription, image, textMeaning,
    textMeaningTranslate, textExampleTranslate,
    textExample, audio, audioExample, audioMeaning, user,
  } = props;

  return (
    <Card
      id={id}
      sx={{
        maxWidth: 350,
        minHeight: 1,
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={`${BASE_URL}${image}`}
          alt={word}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${word} ${transcription}`}
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
      <CardActions>
        <ButtonsActions id={id} user={user} urlArr={[audio, audioMeaning, audioExample]} />
      </CardActions>
    </Card>
  );
}

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { ButtonPlay } from './ButtonPlay';
import { BASE_URL } from '../../constants/url';

export default function CardBook({
  word, transcription, image,
  textMeaning, textMeaningTranslate,
  textExampleTranslate, textExample, audio, audioExample, audioMeaning,
}) {
  return (
    <Card sx={{
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
          <Typography dangerouslySetInnerHTML={{ __html: textMeaning }} gutterBottom variant="hsubtitle1" component="div" />
          <Typography gutterBottom variant="hsubtitle2" component="div">
            {textMeaningTranslate}
          </Typography>
          <Typography dangerouslySetInnerHTML={{ __html: textExample }} gutterBottom variant="hsubtitle1" component="div" />
          <Typography gutterBottom variant="hsubtitle2" component="div">
            {textExampleTranslate}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ButtonPlay urlArr={[audio, audioExample, audioMeaning]} size="small" color="primary">
          Play
        </ButtonPlay>
      </CardActions>
    </Card>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  root: {
      marginBottom : "20px",
    width: "500px"
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function FeedCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar  className={classes.avatar}>
            R
          </Avatar>
        }
        title="Ishan Kumar"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          I am ready to help 
        </Typography>
      </CardContent>
    </Card>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
      marginBottom : "20px",
    width: "500px"
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function FeedCard(props) {
  const classes = useStyles();
  const feed = props.feed;
  console.log(feed);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar  className={classes.avatar}>
            R
          </Avatar>
        }
        title={feed.author.name}
        subheader={feed.author.phoneno}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {feed.content}
        </Typography>
        <Chip label={feed.category}/>
      </CardContent>
    </Card>
  );
}

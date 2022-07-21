import React from 'react'
import { useNavigate } from "react-router-dom";
import moment from 'moment';

//mui import
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

type Postsprops = {
  item: Itemprops
}

type Itemprops = {
  title: string
  author: string
  url: string
  created_at: string
  _tags: string[]
}

const Posts: React.FC<Postsprops> = (props): JSX.Element => {
  let navigate = useNavigate()

  return (
    <div>
      <Card variant='outlined' sx={{ alignItems: 'center', maxWidth: 800 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom component="div">
            {props.item.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            By: {props.item.author}
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            url: {props.item.url}
          </Typography>
          <Typography variant="subtitle2" display="block" gutterBottom>
            Created at: {moment(props.item.created_at).format('LLL')}
          </Typography>
          <Typography variant="subtitle2" display="block" gutterBottom>
            Tags: {props.item._tags[0]}, {props.item._tags[1]}, {props.item._tags[2]}
          </Typography>
          <CardActions>
            <Button id="button" variant="outlined" onClick={() => {
              navigate('/jsondetails', { state: props })
            }}>
              Show JSON
            </Button>
            <Button variant="outlined">
              <Link href={props.item.url} color="inherit" underline="none" target="blank">Full Artical</Link>
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  )
}

export default Posts
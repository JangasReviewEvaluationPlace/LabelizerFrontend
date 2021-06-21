import React from 'react';
import { Link as RouterLink} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));



export default function Nav(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title} noWrap>
            <Link to="/" component={RouterLink} underline="none" color="inherit">Jangas Labelizer</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

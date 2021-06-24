import React from 'react';
import { Route } from "react-router-dom";
import { FetchLabelizerData } from './api/fetch';
import Base from './components/base/index.jsx';

import Authentication from './pages/authentication/index.jsx';
import BaseMenu from './pages/menu/index.jsx';
import Labelizer from './pages/labelizer/index.jsx';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));


function DisplayedComponent(props){
  const {
    route,
    component
  } = props;
  const classes = useStyles();
  const [loaded, setLoaded] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const basicAuth = async () => {
      try {
        await FetchLabelizerData.verifyToken();
        setIsAuthenticated(true);
      } catch (err) {
        console.log(err)
      }
      setLoaded(true);
    }
    basicAuth();
  }, [])

  if (!loaded) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }

  if (loaded && !isAuthenticated){
    return <Route exact path={route} component={Authentication} />
  }

  return <Route exact path={route} component={component} />
}


function App() {
  return (
    <Base>
      <DisplayedComponent route="/" component={BaseMenu}/>
      <DisplayedComponent route="/labelizer" component={Labelizer}/>
    </Base>
  );
}

export default App;

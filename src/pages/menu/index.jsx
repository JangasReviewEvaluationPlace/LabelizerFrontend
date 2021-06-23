import React from 'react';
import { Link as RouterLink} from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextFieldsIcon from '@material-ui/icons/TextFields';


export default function BaseMenu() {
  return (
    <List component="nav" aria-label="menu">
      <ListItem button component={RouterLink} to="/labelizer">
        <ListItemIcon>
          <TextFieldsIcon />
        </ListItemIcon>
        <ListItemText primary="Labelizer" />
      </ListItem>
    </List>
  )
}

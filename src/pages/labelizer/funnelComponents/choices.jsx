import React from 'react'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';


function copyArray(arr){
  var resultArr = []
  arr.forEach(element => {
    resultArr.push(element)
  });
  return resultArr;
}


export default function Choices(props) {
  const {choices, checked, setChecked} = props;
  const [checked_, setChecked_] = React.useState(copyArray(checked));

  function handleChange(e, id){
    var checkedValues = checked;
    if (e.target.checked){
      checkedValues.push(id)
    }
    else {
      const index = checkedValues.indexOf(id);
      if (index > -1){
        checkedValues.splice(index, 1);
      }
    }
    setChecked(checkedValues);
    setChecked_(copyArray(checkedValues));
  }

  return (
    <List>
      {
        choices.map((value, index) =>
        <ListItem key={index}>
          <ListItemText
            primary={value.title}
          />
          <ListItemSecondaryAction
            onClick={(e) => handleChange(e, value.id)}
          >
            <IconButton
              edge="end"
              aria-label="Check"
            >
              <Checkbox
                checked={checked_.includes(value.id)}
              />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </List>
  )
}

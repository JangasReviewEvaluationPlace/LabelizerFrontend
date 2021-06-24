import React from 'react'
import { FetchLabelizerData } from '../../api/fetch';
import { TextData, Statistics, Label } from '../../api/models';

import StatisticTable from './labelingComponents/statistics';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


function copyArray(arr){
  var resultArr = []
  arr.forEach(element => {
    resultArr.push(element)
  });
  return resultArr;
}

export default function Labeling(props) {
  const [data, setData] = React.useState(new TextData("", "", ""))
  const [statistics, setStatistics] = React.useState(new Statistics(0, 0, 0))
  const [tags, setTags] = React.useState([])
  const [selectedLabels, setSelectedLabels] = React.useState([])

  React.useEffect(() => {
    const load = async () => {
      await getNextData();
      await loadTags();
    }
    load()
  }, [])

  const loadTags = async () => {
    const tags = await FetchLabelizerData.getTags();
    setTags(tags);
  }

  const getNextData = async () => {
    setSelectedLabels([]);
    const labels = await FetchLabelizerData.getNextTextData();
    const statistics = await FetchLabelizerData.getStatistics();
    setData(labels);
    setStatistics(statistics);
  }

  const onApply = async () => {
    const label = new Label(selectedLabels, data)
    await FetchLabelizerData.postLabeledData(label);
    await getNextData();
  }

  function handleChange(e, id){
    var checkedValues = selectedLabels;
    if (selectedLabels.includes(id)){
      const index = checkedValues.indexOf(id);
      checkedValues.splice(index, 1);
    }
    else {
      checkedValues.push(id)
    }
    setSelectedLabels(copyArray(checkedValues));
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Labeling
      </Typography>
      <Paper variant="outlined">
        <CardContent>
          <Typography variant="body1" gutterBottom>
            {data.content}
          </Typography>
        </CardContent>
      </Paper>
      <List>
      {
        tags.map((tag, index) => 
          <ListItem
            button
            key={index}
            onClick={(e) => handleChange(e, tag.id)}
          >
            <ListItemText
              primary={tag.title}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="Check"
                onClick={(e) => handleChange(e, tag.id)}
              >
                <Checkbox
                  checked={selectedLabels.includes(tag.id)}
                />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )
      }
      </List>
      <Button
        variant="outlined"
        color="primary"
        onClick={onApply}
        fullWidth
      >
        Apply
      </Button>
      <Divider style={{marginTop: "8px"}}/>
      <StatisticTable statistics={statistics} />
    </>
  )
}

import React from 'react'
import { axios_ } from '../../components/baseRequest';

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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

function copyArray(arr){
  var resultArr = []
  arr.forEach(element => {
    resultArr.push(element)
  });
  return resultArr;
}

export default function Labeling(props) {
  const [data, setData] = React.useState([])
  const [tags, setTags] = React.useState([])
  const [statistics, setStatistics] = React.useState([])
  const [selectedLabels, setSelectedLabels] = React.useState([])

  const getNextData = async () => {
    const dataResponse = await axios_.get(`/labelizer/label${window.location.search}`)
    setSelectedLabels([]);
    setData(dataResponse.data);

    const statisticResponse = await axios_.get(`/labelizer/statistics${window.location.search}`)
    setStatistics(statisticResponse.data);
  }

  React.useEffect(() => {
    const getTags = async () => {
      const tagResponse = await axios_.get(`/labelizer/tags${window.location.search}`)
      setTags(tagResponse.data)
    }
    getNextData();
    getTags();
  }, [])


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

  const onApply = async () => {
    const url = `/labelizer/label${window.location.search}`
    const payload = {
      source: data.source,
      id: data.id,
      tags: selectedLabels
    }
    await axios_.post(url, payload)
    await getNextData()
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
      <Typography variant="h6" gutterBottom>
        Statistics
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="statistics">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Total data-count for selection
              </TableCell>
              <TableCell component="th" scope="row">
                {statistics.text_data}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Already Labeled
              </TableCell>
              <TableCell component="th" scope="row">
                {statistics.already_labeled}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Labels with Selection
              </TableCell>
              <TableCell component="th" scope="row">
                {statistics.matches}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

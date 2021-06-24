import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';


export default function StatisticTable(props) {
  const { statistics } = props;

  return (
    <>
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
                {statistics.textData}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Already Labeled
              </TableCell>
              <TableCell component="th" scope="row">
                {statistics.alreadyLabeled}
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

import React from 'react'
import { Grid } from '@mui/material'
import PersonsList from './PersonsList'
import { RecordsDataContext } from '../RecordsContext'
import { leftRecordsData, rightRecordsData } from '../Utils'

function PersonsDiff({
  leftGx,
  setLeftGx,
  rightGx,
  setRightGx,
  finalGx,
  setFinalGx,
}) {
  return (
    <Grid container alignItems="flex-start" justifyContent="center">
      <Grid item xs={6}>
        <RecordsDataContext.Provider
          value={leftRecordsData(
            leftGx,
            setLeftGx,
            rightGx,
            setRightGx,
            finalGx,
            setFinalGx
          )}
        >
          <PersonsList persons={leftGx.persons} />
        </RecordsDataContext.Provider>
      </Grid>
      <Grid item xs={6}>
        <RecordsDataContext.Provider
          value={rightRecordsData(
            leftGx,
            setLeftGx,
            rightGx,
            setRightGx,
            finalGx,
            setFinalGx
          )}
        >
          <PersonsList persons={rightGx.persons} />
        </RecordsDataContext.Provider>
      </Grid>
    </Grid>
  )
}

export default PersonsDiff

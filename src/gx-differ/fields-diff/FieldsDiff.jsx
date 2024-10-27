import { Grid } from "@mui/joy";
import PropTypes from "prop-types";
import { RecordsDataContext } from "../RecordsContext";
import { leftRecordsData, rightRecordsData } from "../Utils";
import FieldsList from "./FieldsList";

export default function FieldsDiff({
  leftGx,
  setLeftGx,
  rightGx,
  setRightGx,
  finalGx,
  setFinalGx,
}) {
  return (
    <Grid container spacing={2} alignItems="flex-start" justifyContent="center">
      <Grid xs={6}>
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
          <FieldsList fields={leftGx.fields ? leftGx.fields : []} />
        </RecordsDataContext.Provider>
      </Grid>
      <Grid xs={6}>
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
          <FieldsList fields={rightGx.fields ? rightGx.fields : []} />
        </RecordsDataContext.Provider>
      </Grid>
    </Grid>
  );
}

FieldsDiff.propTypes = {
  leftGx: PropTypes.object,
  setLeftGx: PropTypes.func,
  rightGx: PropTypes.object,
  setRightGx: PropTypes.func,
  finalGx: PropTypes.object,
  setFinalGx: PropTypes.func,
};

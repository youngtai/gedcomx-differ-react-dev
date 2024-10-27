import { Grid } from "@mui/joy";
import PropTypes from "prop-types";
import { RecordsDataContext } from "../RecordsContext";
import { leftRecordsData, rightRecordsData } from "../Utils";
import PersonsList from "./PersonsList";

export default function PersonsDiff({
  leftGx,
  setLeftGx,
  rightGx,
  setRightGx,
  finalGx,
  setFinalGx,
}) {
  return (
    <Grid container spacing={2} justifyContent="center">
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
          <PersonsList persons={leftGx.persons} />
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
          <PersonsList persons={rightGx.persons} />
        </RecordsDataContext.Provider>
      </Grid>
    </Grid>
  );
}

PersonsDiff.propTypes = {
  leftGx: PropTypes.object.isRequired,
  setLeftGx: PropTypes.func.isRequired,
  rightGx: PropTypes.object.isRequired,
  setRightGx: PropTypes.func.isRequired,
  finalGx: PropTypes.object.isRequired,
  setFinalGx: PropTypes.func.isRequired,
};
